
const findone = async (req, app) => {
    //console.log(app.request.query);
    if(app.request.query.col === undefined){
        return {code: 503,'type':"error", "msg": "Col is required"}
    }
    let query, data;
    if(app.request.query.id !== undefined){
       query = {
        $or: [
            {_id: app.request.query.id},
            {_id: app.db.objectID(app.request.query.id)}
        ]
       };
       data = await app.db._findOne(app.request.query.col, query);
      console.log(query);
    }else{
        query = app.request.query.qry === undefined ? "{}" : app.request.query.qry;
        query = JSON.parse(query);
        console.log('20 ' , query)
        if(query._id !== undefined){
            query = {
                $or: [
                    {_id: query._id},
                    {_id: app.db.objectID(query._id)}
                ]
            }
            console.log(query)
            data = await app.db._findOne(app.request.query.col, query);
        }else{
            
            data = await app.db._findOne(app.request.query.col, query);
        }
    }
    
    console.log(data);
    return {code: 200, type: 'success', data: data}
}
export default findone;
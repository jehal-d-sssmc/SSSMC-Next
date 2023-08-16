
const findone = async (req, app) => {
    //console.log(app.request.query);
    if(app.request.query.col === undefined){
        return {code: 503,'type':"error", "msg": "Col is required"}
    }
    let query;
    if(app.request.query.id !== undefined){
       query = {
        $or: [
            {_id: app.request.query.id},
            {_id: app.db.objectID(app.request.query.id)}
        ]
       };
       console.log(query);
    }else{
        query = app.request.query.qry === undefined ? "{}" : app.request.query.qry;
        query = JSON.parse(query);
    }
    let data = await app.db.findOne(app.request.query.col, query);
    console.log(data);
    return {code: 200, type: 'success', data: data}
}
export default findone;
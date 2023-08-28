import react from "react";
import Header from "../../inc/component/common/Header";
import Footer from "../../inc/component/common/Footer";
import Login from "../../inc/component/common/Login";
import Content from "../../inc/component/public/page/Content";

export default class Page extends react.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      user: undefined,
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        user: this.props.app.helper.user,
      });
    }, 1000);
  }

  render() {
    return (
      <>
        <Header {...this.props} />

        <Content {...this.props} />


        <Footer {...this.props} />
      </>
    );
  }
}

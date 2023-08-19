import react from "react";
import Head from "next/head";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";
import SaiInspires from "../inc/component/public/SaiInspires";

export default class Watch extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  shouldComponentUpdate = () => false;

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        user: this.props.app.helper.user,
      });
      this.forceUpdate();
    }, 1000);
  }

  render() {
    return (
      <>
        <Header {...this.props} />

        <SaiInspires {...this.props} />

        <Footer {...this.props} />
      </>
    );
  }
}

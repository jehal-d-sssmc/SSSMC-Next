import react from "react";
import Head from "next/head";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";
import WatchComp from "../inc/component/public/Watch";

export default class Watch extends react.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
      this.forceUpdate()
    }, 1000);
  }

  render() {
    return (
      <>
        <Header {...this.props} />

        <WatchComp {...this.props} />

        <Footer {...this.props} />
      </>
    );
  }
}

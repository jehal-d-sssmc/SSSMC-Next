import react from "react";
import Head from "next/head";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";
import WatchComp from "../inc/component/public/Watch";

export default class Watch extends react.Component {
  constructor(props) {
    super(props);
    this.query = this.props.app.helper._query();
    console.log(this.query);
    this.state = {
      user: undefined,
      category: this.query.cat,
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

        <WatchComp cat={this.state.category} {...this.props} />

        <Footer {...this.props} />
      </>
    );
  }
}

import react from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";

export default class Watch extends react.Component {
  constructor(props) {
    super(props);
    this.query = this.props.app.helper._query();
    this.state = {
      user: undefined,
      category: this.query.cat || "",
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        user: this.props.app.helper.user,
      });
      this.forceUpdate();
    }, 1000);
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <>
        <Header {...this.props} />

        <Footer {...this.props} />
      </>
    );
  }
}

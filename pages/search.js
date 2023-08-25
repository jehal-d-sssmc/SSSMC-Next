import react from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";
import Index from "../inc/component/public/Home";
import Search from "../inc/component/public/Search";

export default class search extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        user: this.props.app.helper.user,
      });
    // this.forceUpdate();
    }, 1000);
  }

 // shouldComponentUpdate = () => false;

  render() {
    return (
      <>
        <Header {...this.props} />

        {<Search {...this.props} />}

        <Footer {...this.props} />
      </>
    );
  }
}

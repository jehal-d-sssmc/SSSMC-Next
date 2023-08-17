import react from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "../../inc/component/common/Header";
import Footer from "../../inc/component/common/Footer";
import Login from "../../inc/component/common/Login";
import ReadOne from "../../inc/component/public/ReadOne";

export default class Watch extends react.Component {
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

        {<ReadOne {...this.props} />}

        <Footer {...this.props} />
      </>
    );
  }
}

import react from "react";
import Head from "next/head";
import Header from "../inc/component/common/Header";
import Footer from "../inc/component/common/Footer";
import Login from "../inc/component/common/Login";
import Contact from "../inc/component/public/Contact";

export default class contact extends react.Component {
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
      this.forceUpdate();
    }, 1000);
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <>
        <Header {...this.props} />

        {<Contact {...this.props} />}

        <Footer {...this.props} />
      </>
    );
  }
}

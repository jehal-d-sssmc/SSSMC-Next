import React from "react";
import { AiFillYoutube, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { BsFileMusicFill } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";

export default class SocialLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.links = [
      {
        title: "Youtube - Main Channels",
        icon: <AiFillYoutube size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiOfficial"
                target="_blank"
              >
                <p>Sri Sathya Sai Official</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@PrasanthiMandirLiveRadioSai"
                target="_blank"
              >
                <p>SSSMC - Prasanthi Mandir Live</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiBhajans"
                target="_blank"
              >
                <p>Sri Sathya Sai Bhajans</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiKidsWorld"
                target="_blank"
              >
                <p>Sri Sathya Sai Kids World</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiSpeaksOfficial"
                target="_blank"
              >
                <p>Sri Sathya Sai Speaks</p>
              </a>
            </li>
          </ul>
        ),
      },
      {
        title: "Youtube - Sister Channels",
        icon: <AiFillYoutube size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiSandeshaJhari"
                target="_blank"
              >
                <p>Sri Sathya Sai Sandesha Jhari (Telugu)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiHindi"
                target="_blank"
              >
                <p>Sri Sathya Sai Prem Vani (Hindi)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiAnandavani"
                target="_blank"
              >
                <p>Sri Sathya Sai Anandavani (Tamil)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiAmrutavani"
                target="_blank"
              >
                <p>Sri Sathya Sai Amrutavani (Kannada)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiMadhuravani"
                target="_blank"
              >
                <p>Sri Sathya Sai Madhuravani (Malayalam)</p>
              </a>
            </li>
          </ul>
        ),
      },
      {
        title: "Instagram Handles",
        icon: <AiFillInstagram size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://www.instagram.com/srisathyasaiofficial/"
                target="_blank"
              >
                <p>Sri Sathya Sai Official</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prasanthibhajangroup/"
                target="_blank"
              >
                <p>Sri Sathya Sai Bhajans (Prasanthi Bhajan Group)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/srisathyasaianandavani/"
                target="_blank"
              >
                <p>Sri Sathya Sai Anandavani (Tamil)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/sandeshajhari/"
                target="_blank"
              >
                <p>Sri Sathya Sai Sandesha Jhari (Telugu)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/srisathyasaimadhuravani/"
                target="_blank"
              >
                <p>Sri Sathya Sai Madhuravani (Malayalam)</p>
              </a>
            </li>
          </ul>
        ),
      },
      {
        title: "Music Distribution Platforms",
        icon: <BsFileMusicFill size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://open.spotify.com/artist/3ivMIX7rY3DHjrs9XSxuln"
                target="_blank"
              >
                <p>Spotify - Sri Sathya Sai </p>
              </a>
            </li>
            <li>
              <a
                href="https://music.apple.com/in/artist/sri-sathya-sai/1643682253"
                target="_blank"
              >
                <p>Apple Music - Sri Sathya Sai</p>
              </a>
            </li>
            <li>
              <a href="https://gaana.com/artist/sri-sathya-sai" target="_blank">
                <p>Gaana - Sri Sathya Sai</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.jiosaavn.com/artist/sri-sathya-sai-official-songs/PaMtPYcMq3E_"
                target="_blank"
              >
                <p>Jio Saavn - Sri Sathya Sai Official</p>
              </a>
            </li>
            <li>
              <a
                href="https://music.amazon.in/artists/B0BD8PXG4R/sri-sathya-sai"
                target="_blank"
              >
                <p>Amazon Music - Sri Sathya Sai Speaks</p>
              </a>
            </li>
          </ul>
        ),
      },

      {
        title: "Facebook Profiles",
        icon: <AiFillFacebook size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://www.facebook.com/SRI.SATHYA.SAI.BABA"
                target="_blank"
              >
                <p>Sri Sathya Sai Baba </p>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/srisathyasaitelugu/"
                target="_blank"
              >
                <p>Sri Sathya Sai Sandesha Jhari (Telugu)</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/groups/radiosaihindi/"
                target="_blank"
              >
                <p>Sri Sathya Sai Prem Vani (Hindi)</p>
              </a>
            </li>
          </ul>
        ),
      },
      {
        title: "Telegram Groups",
        icon: <BiLogoTelegram size={42} />,
        items: (
          <ul>
            <li>
              <a href="https://t.me/SriSathyaSai_RadioSai" target="_blank">
                <p>Sri Sathya Sai Baba </p>
              </a>
            </li>
            <li>
              <a href="https://t.me/SriSathyaSaiSandeshaJhari" target="_blank">
                <p>Sri Sathya Sai Sandesha Jhari (Telugu)</p>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/SriSathyaSai_RadioSai_Hindi"
                target="_blank"
              >
                <p>Sri Sathya Sai Prem Vani (Hindi)</p>
              </a>
            </li>
            <li>
              <a href="https://t.me/SriSathyaSaiTamil" target="_blank">
                <p>Sri Sathya Sai Anandavani (Tamil)</p>
              </a>
            </li>
          </ul>
        ),
      },
      {
        title: "Other Social Media Profiles",
        icon: <AiFillYoutube size={42} />,
        items: (
          <ul>
            <li>
              <a
                href="https://api.whatsapp.com/send/?phone=9393258258&text&type=phone_number&app_absent=0"
                target="_blank"
              >
                <p>Whatsapp - Sri Sathya Sai Media Centre </p>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/TheSathyaSai" target="_blank">
                <p>Twitter - Sri Sathya Sai Official</p>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/SriSathyaSai_RadioSai_Hindi"
                target="_blank"
              >
                <p>Sri Sathya Sai Prem Vani (Hindi)</p>
              </a>
            </li>
            <li>
              <a href="https://t.me/SriSathyaSaiTamil" target="_blank">
                <p>Sri Sathya Sai Anandavani (Tamil)</p>
              </a>
            </li>
          </ul>
        ),
      },
    ];
  }

  async componentDidMount() {
    this.forceUpdate();
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <main style={{ padding: "0" }}>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
          <>
            <div className="social-links-main">
              <div className="p-3 container">
                <div className="social-heading">
                  <h1>Follow Us on Social Media</h1>
                </div>
                <hr />
                <div className="social-links-list">
                  <div className="row">
                    {this.links.map((x) => {
                      return (
                        <>
                          <div className="col-8 col-md-4">
                            <div className="footer-title">
                              {x.title !== undefined && (
                                <>
                                  {" "}
                                  <div className="d-flex justify-content-between">
                                    <h3 className="align-self-center mb-0">
                                      {x.title}
                                    </h3>
                                    <div className="align-self-center">
                                      {x.icon}
                                    </div>
                                  </div>
                                  <hr />
                                </>
                              )}
                            </div>
                            <div className="footer-content">{x.items}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    );
  }
}

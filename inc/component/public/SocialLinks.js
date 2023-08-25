import React from "react";
import { AiFillYoutube, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaPodcast } from "react-icons/fa";
import { BsFileMusicFill, BsWhatsapp } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";

export default class SocialLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      podcastHit: false,
      iconHeadSize: 42,
      iconItemSize: 14,
    };
    this.podcastItems = [
      <div className="col">
        <h5 className="social-title">Sri Sathya Sai Speaks</h5>
        <hr />
        <ul>
          <li>
            <a
              href="https://podcasts.apple.com/in/podcast/sri-sathya-sai-speaks/id1605915380"
              target="_blank"
            >
              <p className="align-self-center">Apple Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://open.spotify.com/show/0AY7LicsnFz6rnsub2flWA?si=105c7cb74015438d&nd=1"
              target="_blank"
            >
              <p>Spotify Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/radiosaihindi/"
              target="_blank"
            >
              <p>Amazon Music</p>
            </a>
          </li>
          <li>
            <a href="https://srisathyasai.hubhopper.com/" target="_blank">
              <p>Hubhopper</p>
            </a>
          </li>
          <li>
            <a
              href="https://radiopublic.com/sri-sathya-sai-speaks-GOD307"
              target="_blank"
            >
              <p>Radio Public</p>
            </a>
          </li>
          <li>
            <a
              href="https://castbox.fm/channel/id4752289?utm_campaign=a_share_ch&utm_medium=dlink&utm_source=a_share&country=us"
              target="_blank"
            >
              <p>Cast Box</p>
            </a>
          </li>
          <li>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5odWJob3BwZXIuY29tL2YwMmFjN2JjMGE4MDM3ODU0ZjM2NjUwZjVjMjM2MzQ0LnJzcw"
              target="_blank"
            >
              <p>Google Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.jiosaavn.com/shows/sri-sathya-sai-speaks/1/vGMXzi6vH4c_"
              target="_blank"
            >
              <p>Jio Saavn Podcasts</p>
            </a>
          </li>
        </ul>
      </div>,
      <div className="col">
        <h5 className="social-title">Sri Sathya Sai Official</h5>
        <hr />
        <ul>
          <li>
            <a
              href="https://podcasts.apple.com/in/podcast/sri-sathya-sai-podcast-official/id1577475301"
              target="_blank"
            >
              <p className="align-self-center">Apple Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://open.spotify.com/show/3xK189Fcfk4dwmh4KzNnc4?si=9903288c44514886&nd=1"
              target="_blank"
            >
              <p>Spotify Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://music.amazon.in/podcasts/97ea0ffc-0d63-4c74-8690-05f30acf5cea/sri-sathya-sai-podcast-official"
              target="_blank"
            >
              <p>Amazon Music</p>
            </a>
          </li>
          <li>
            <a
              href="https://radiopublic.com/sri-sathya-sai-podcast-official-WaoYKA"
              target="_blank"
            >
              <p>Radio Public</p>
            </a>
          </li>
          <li>
            <a
              href="https://castbox.fm/channel/id4513066?utm_campaign=a_share_ch&utm_medium=dlink&utm_source=a_share&country=us"
              target="_blank"
            >
              <p>Cast Box</p>
            </a>
          </li>
          <li>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy82M2I3ODIzMC9wb2RjYXN0L3Jzcw"
              target="_blank"
            >
              <p>Google Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.jiosaavn.com/shows/sri-sathya-sai-podcast-official/1/yaeu,iPSCHM_"
              target="_blank"
            >
              <p>Jio Saavn Podcasts</p>
            </a>
          </li>
        </ul>
      </div>,
      <div className="col">
        <h5 className="social-title">Sri Sathya Sai Bhajans</h5>
        <hr />
        <ul>
          <li>
            <a
              href="https://podcasts.apple.com/in/podcast/sri-sathya-sai-bhajans/id1605910315"
              target="_blank"
            >
              <p className="align-self-center">Apple Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://music.amazon.in/podcasts/7ee03dba-b586-4bcf-99df-cecb6d9e8856/sri-sathya-sai-bhajans"
              target="_blank"
            >
              <p>Amazon Music</p>
            </a>
          </li>
          <li>
            <a href="https://radiosaisssmc.hubhopper.com/" target="_blank">
              <p>Hubhopper</p>
            </a>
          </li>
          <li>
            <a
              href="https://radiopublic.com/sri-sathya-sai-bhajans-G45JR7"
              target="_blank"
            >
              <p>Radio Public</p>
            </a>
          </li>
          <li>
            <a
              href="https://castbox.fm/channel/id4752284?utm_campaign=a_share_ch&utm_medium=dlink&utm_source=a_share&country=us"
              target="_blank"
            >
              <p>Cast Box</p>
            </a>
          </li>
          <li>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5odWJob3BwZXIuY29tLzZkYmU2ZjI2MzkxZDZkMzk4NzMxZTIzNTYzOTFlMzVmLnJzcw?sa=X&ved=0CAMQ4aUDahcKEwjwwIuNksj1AhUAAAAAHQAAAAAQbA"
              target="_blank"
            >
              <p>Google Podcasts</p>
            </a>
          </li>
        </ul>
      </div>,
      <div className="col">
        <h5 className="social-title">Prasanthi Mandir Prayers</h5>
        <hr />
        <ul>
          <li>
            <a
              href="https://podcasts.apple.com/in/podcast/prasanthi-mandir-prayers/id1605914389"
              target="_blank"
            >
              <p className="align-self-center">Apple Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://open.spotify.com/show/64xc678CgGGPrCBj0YiEkl?si=c2b07a54b6fe41b8&nd=1"
              target="_blank"
            >
              <p>Spotify Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://music.amazon.in/podcasts/52c5e895-4e21-45a2-8457-c0a3e6af197c/prasanthi-mandir-prayers"
              target="_blank"
            >
              <p>Amazon Music</p>
            </a>
          </li>
          <li>
            <a href="https://srisathyasai.hubhopper.com/" target="_blank">
              <p>Hubhopper</p>
            </a>
          </li>
          <li>
            <a
              href="https://radiopublic.com/prasanthi-mandir-prayers-8QA1NA"
              target="_blank"
            >
              <p>Radio Public</p>
            </a>
          </li>
          <li>
            <a
              href="https://castbox.fm/channel/id4752290?utm_campaign=a_share_ch&utm_medium=dlink&utm_source=a_share&country=us"
              target="_blank"
            >
              <p>Cast Box</p>
            </a>
          </li>
          <li>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5odWJob3BwZXIuY29tLzVlMDNmOGM0ZGNjZGY0N2Q2YzBmYmZmZDg2YjAzNmViLnJzcw"
              target="_blank"
            >
              <p>Google Podcasts</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.jiosaavn.com/shows/prasanthi-mandir-prayers/1/NwsquLB4WyA_"
              target="_blank"
            >
              <p>Jio Saavn Podcasts</p>
            </a>
          </li>
        </ul>
      </div>,
    ];
    this.links = [
      {
        title: "Youtube - Main Channels",
        icon: <AiFillYoutube size={this.state.iconHeadSize} />,
        items: (
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@SriSathyaSaiOfficial"
                target="_blank"
              >
                <p className="align-self-center">Sri Sathya Sai Official</p>
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
        icon: <AiFillYoutube size={this.state.iconHeadSize} />,
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
        icon: <AiFillInstagram size={this.state.iconHeadSize} />,
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
        icon: <BsFileMusicFill size={this.state.iconHeadSize} />,
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
        icon: <AiFillFacebook size={this.state.iconHeadSize} />,
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
        icon: <BiLogoTelegram size={this.state.iconHeadSize} />,
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
        icon: <IoShareSocialSharp size={this.state.iconHeadSize} />,
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
                            <div className="social-title">
                              {x.title !== undefined && (
                                <>
                                  {" "}
                                  <div className="d-flex justify-content-start gap-3">
                                    <div className="align-self-center">
                                      {x.icon}
                                    </div>
                                    <h3 className="align-self-center mb-0">
                                      {x.title}
                                    </h3>
                                  </div>
                                  <hr />
                                </>
                              )}
                            </div>
                            <div className="social-content">{x.items}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="row">
                    <div className="social-title">
                      <div className="d-flex justify-content-start gap-3">
                        <div className="align-self-center">
                          <FaPodcast size={this.state.iconHeadSize} />
                        </div>
                        <h3 className="align-self-center mb-0">Podcasts</h3>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="row social-content">
                    {this.podcastItems.map((podItem) => {
                      return podItem;
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

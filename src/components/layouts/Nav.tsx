import * as React from "react";
import Menu from "./Menu";
import {
  humburgerIcon,
  logo,
  Mid_Logo,
  small_logo,
} from "../../sites-global/global";
import Linking from "../commons/Link";

const Nav = (props: any) => {
  /* This is set id in body  everytime     */
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  /* This function for open menu toggle when our screen size exist in mobile size   */
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle(
      "menu-opened"
    );
  };
  /* This function for Close menu toggle when our screen size exist in mobile size   */
  const RemoveMenu = () => {
    (document.getElementById("body") as HTMLInputElement).classList.remove(
      "menu-opened"
    );
  };

  return (
    //  This is for full part logo
    <div className="site-header">
      <div className="header-top">
        <div className="container">
          <div className="hidden lg:block  logo">
            <div className="logo-inner">
              {(
                <a
                  href={
                    props._site.c_matalan_header_logo.clickthroughUrl ||
                    "https://www.matalan.co.uk/"
                  }
                >
                  <img
                    src={props._site.c_matalan_header_logo.image.url}
                    alt="middlelogo"
                  />
                </a>
              ) || <div dangerouslySetInnerHTML={{ __html: logo }} />}
            </div>
          </div>

          {/* This is for Midddle part logo */}
          <div className="block logo-large-mob lg:hidden logo">
            <div className="logo-inner">
              {(
                <a
                  href={
                    props._site.c_matalan_mobile_view_header_logo
                      .clickthroughUrl || "https://www.matalan.co.uk/"
                  }
                >
                  <img
                    src={
                      props._site.c_matalan_mobile_view_header_logo.image.url
                    }
                    alt="mobilelogo"
                  />
                </a>
              ) || <div dangerouslySetInnerHTML={{ __html: Mid_Logo }} />}
            </div>
          </div>

          <div className=" hidden logo-sm-mob logo">
            <div className="logo-inner">
              {/* This is for Small part logo */}
              <div dangerouslySetInnerHTML={{ __html: small_logo }} />
            </div>
          </div>

          <ul className="top-hdr-links">
            {props._site.c_top_header_links &&
              props._site.c_top_header_links.map((toplinks: any) => {
                return (
                  <li className="px-4 inline">
                    <Linking props={toplinks} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="main-nav" onClick={RemoveMenu}>
        <div className="container">
          <Menu c_matalanMenu={props._site} />
        </div>
      </div>

      <button type="button" className="menu-btn" id="menu-btn" onClick={toggle}>
        <span dangerouslySetInnerHTML={{ __html: humburgerIcon }} />
        <span>Menu</span>
      </button>
    </div>
  );
};

export default Nav;

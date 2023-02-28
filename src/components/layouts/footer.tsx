import * as React from "react";
import "../../index.css";
import { cookieText, cookiesUrl } from "../../sites-global/global";
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../sites-global/staticData";
import { useEffect, useState } from "react";
import FooterAccordian from "../commons/FooterAccordian";
import { Link } from "@yext/pages/components";

const Footer = (props: any) => {
  const { footer } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  /* When this component render very first time then this UseEffect will run and Check our screen size
and call handleMediaQueryChange function */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  /* This handleMediaQueryChange function check if screen is small it will update ouir state (setIsSmallScreen)*/
  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="store-locator">
            {footer.c_store_finder.map((storfinder: any, index: number) => {
              return (
                <div className="store-inner" key={index}>
                  <img src={storfinder.icon.url} alt="ctalabel" />
                  <a href={storfinder.cTA.link}>{storfinder.cTA.label}</a>
                </div>
              );
            })}

            <div className="store-inner">
              <img src={footer.c_fAQs.icon.url} alt="faqlabel" />
              <a href={footer.c_fAQs.cTA.label}>{footer.c_fAQs.cTA.label}</a>
            </div>
          </div>
          {!isSmallScreen ? (
            <div className="link-sec-footer ">
              <div className="footer-block">
                <h4 className="footer-block-title">
                  {footer.c_customer_services.headerLinksHeading}
                </h4>
                <ul className="list-none">
                  {footer.c_customer_services.iconCTA.map(
                    (customerService: any, index: number) => {
                      return (
                        <li key={index}>
                          <a href={customerService.cTA.link}>
                            {customerService.cTA.label}
                          </a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="footer-block">
                <h4 className="footer-block-title">
                  {footer.c_about_matalan.headerLinksHeading}
                </h4>
                <ul className="list-none">
                  <li>{footer.c_about_matalan.headerLinksHeading}</li>
                  {footer.c_about_matalan.headerLinks.map(
                    (aboutMatalan: any, index: number) => {
                      return (
                        <li key={index}>
                          <a href={aboutMatalan.link}>{aboutMatalan.label}</a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="footer-block">
                <h4 className="footer-block-title">
                  {footer.c_our_website.headerLinksHeading}
                </h4>
                <ul className="list-none">
                  {footer.c_our_website.headerLinks.map(
                    (ourWebsite: any, index: number) => {
                      return (
                        <li key={index}>
                          <a href={ourWebsite.link}>{ourWebsite.label}</a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <FooterAccordian footer={footer} />
          )}
          <div className="copyright-bx">
            <h4 className="footer-block-title">{footer.c_appSectionText}</h4>
            <ul className="flex-row mt-4 flex w-full mb-3 app-icons">
              {footer.c_app_icon.map((appicon: any, index: number) => {
                return (
                  <li className="mr-3" key={index}>
                    <a href={appicon.cTA.link}>
                      <img src={appicon.icon.url} alt="applabel" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul className="social-media-bx">
              {footer.c_socialIcons.map((icon: any, index: number) => {
                return (
                  <li className="" key={index}>
                    <a href={icon.cTA.link} target="_blank" rel="noreferrer">
                      <img
                        src={icon.icon.url}
                        height="20"
                        alt="twitter"
                        width="21"
                        className="inline-block w-5 h-auto"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <span className="text-xs flex-wrap" data-copyright="">
              {footer.c_footerDescription}
            </span>

            <div className="company-logo">
              <img src={footer.c_matalan_footer_logo.url} alt="footerlogo" />
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent
        buttonText={StaticData.CookiebuttonText}
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p>
          {cookieText}
          <Link
            className="text-cookies-link"
            href={cookiesUrl}
            data-ya-track={`cookie`}
            eventName={`cookie`}
            rel="noopener noreferrer"
          >
            {StaticData.cookie}
          </Link>
          .
        </p>
      </CookieConsent>
    </>
  );
};

export default Footer;

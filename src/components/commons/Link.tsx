import * as React from "react";
import { Link } from "@yext/pages/components";

const Linking = (props: any) => {
  return (
    <>
      {(() => {
        switch (props.props.linkType) {
          case "URL":
            return (
              <Link
                href={props.props.link}
                data-ya-track={`${props.props.label}`}
                eventName={`${props.props.label}`}
                rel="noopener noreferrer"
              >
                {props.props.label}
              </Link>
            );
          case "OTHER":
            return (
              <Link
                href={props.props.link}
                target="_blank"
                data-ya-track={`-${props.props.label}`}
                eventName={`${props.props.label}`}
                rel="noopener noreferrer"
              >
                {props.props.label}
              </Link>
            );
          case "PHONE":
            return (
              <Link
                href={`tel:${props.props.link}`}
                data-ya-track={`${props.props.label}`}
                eventName={`${props.props.label}`}
                rel="noopener noreferrer"
              >
                {props.props.label}
              </Link>
            );
          case "Email":
            return (
              <Link
                href={`mailto:${props.props.link}`}
                data-ya-track={`${props.props.label}`}
                eventName={`${props.props.label}`}
                rel="noopener noreferrer"
              >
                {props.props.label}
              </Link>
            );
          default:
            return "";
        }
      })()}
      </>
  );
};

export default Linking;

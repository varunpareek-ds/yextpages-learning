import * as React from "react";
import useOpenClose from "../../hooks/useOpenClose";
import { Week } from "./hours";

interface OpenCloseBlock {
  hoursData: Week;
  timeZone: string;
}
function OpenCloseBlock({ hoursData, timeZone }: OpenCloseBlock) {
  const { openObject } = useOpenClose(hoursData, timeZone);

  const week: any = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  };

  const formatTime = (time: string) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";

    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  
  if (openObject.isOpen) {
    if (openObject.start === "00:00" && openObject.end === "23:59") {
      return <div className={"opendot notHighlight"}>Open 24 Hours</div>;
    } else {
      return (
        <div className={"opendot notHighlight green-dot"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="notHighlight"
          >
            <circle data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#383" />
          </svg>
          <div className="hours-info ">
            {" "}
            <span className="font-second-main-font notHighlight ">
              {" "}
              Open now {" "}
            </span>
            <span className="lowercase notHighlight">
              {formatTime(openObject.start).replace(':00','')}
            </span>
            <span className="lowercase notHighlight"> to </span>
            <span className="lowercase notHighlight">
              {formatTime(openObject.end).replace(':00','')}
            </span>
          </div>
        </div>
      );
    }
  } else if (openObject.isClosed && openObject.start) {
    return (
      <div className={"closeddot notHighlight 4"}>
        <div className="red-dot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="notHighlight"
          >
            <circle data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
          </svg>
          <div className="hours-info ">
            <span className="font-second-main-font notHighlight">
              {" "}
              Closed -{" "}
            </span>
            <span className="notHighlight "> Opens at </span>
            <span className="lowercase notHighlight">
              {formatTime(openObject.start).replace(':00','')}
            </span>{" "}
            <span className="notHighlight">
              {openObject.day ? week[openObject.day] : ""}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="closeddot notHighlight 2">
        <div className="red-dot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="notHighlight"
          >
            <circle data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
          </svg>
          <div className="hours-info notHighlight ">Closed</div>
        </div>
      </div>
    );
  }
}

export default OpenCloseBlock;

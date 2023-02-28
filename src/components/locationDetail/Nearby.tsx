import * as React from "react";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose";
import Availability from "./Availability";
import { Link } from "@yext/pages/components";

export default function Nearby(props: any) {
  const [neabyData, setnearbyData] = React.useState(
    props.externalApiData.response.results
  );

  return (
    <>
      {neabyData.map((location: any, index: number) => {
        let url = "";
        const name: any = location.data.geomodifier?.toLowerCase();
        const string: any = name.toString();
        const result1: any = string.replaceAll(" ", "-");
        if (!location.data.slug) {
          url = `/${location.data.id}-${result1}.html`;
        } else {
          url = `/${location.data.slug.toString()}.html`;
        }

        if (index > 0) {
          return (
            <div className="nearby-card" key={index}>
              <div className="location-name-miles icon-row">
                <h2>
                  <Link
                    className="inline-block notHighlight"
                    href={url}
                    data-ya-track={`${location.data.geomodifier}`}
                    eventName={`${location.data.geomodifier}`}
                    rel="noopener noreferrer"
                  >
                    {location.data.geomodifier}
                  </Link>
                </h2>
              </div>
              <div className="icon-row content-col">
                <Address address={location.data.address} />
              </div>
              <div className="icon-row closeing-div">
                {location.data.hours ? (
                  <div
                    className="flex open-now-string items-center "
                    data-id={`main-shop-${location.data.id}`}
                  >
                    <OpenClose
                      timezone={location.data.timezone}
                      hours={location.data.hours}
                      deliveryHours={location.data.hours}
                    ></OpenClose>
                  </div>
                ) : (
                  <div className="closeddot notHighlight red-dot">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                    >
                      <circle
                        id="Ellipse_5"
                        data-name="Ellipse 5"
                        cx="4"
                        cy="4"
                        r="4"
                        fill="#ad1e1f"
                      />
                    </svg>
                    <div className="hours-info text-lg font-second-main-font closeddot">
                      Closed
                    </div>
                  </div>
                )}
              </div>
              <div className="icon-row content-col availability-col">
                <Availability
                  c_openForShoppingAvailibility={
                    location.data.c_open_for_shopping
                  }
                  c_clickCollectAvaliability={
                    location.data.c_click_collect_availability
                  }
                  c_parking_facilities={location.data.c_parking_facilities}
                  c_fitting_rooms={location.data.c_fitting_rooms}
                  hours={location.data.hours}
                />
              </div>
              <div className="button-bx">
                <Link
                  className="btn"
                  href={url}
                  data-ya-track={`viewstore-${location.data.geomodifier}`}
                  eventName={`viewstore-${location.data.geomodifier}`}
                  rel="noopener noreferrer"
                >
                  STORE DETAILS
                </Link>
                <GetDirection
                  buttonText={
                    props.c_getDirectionsCTAText
                      ? props.c_getDirectionsCTAText
                      : "Get directions"
                  }
                  address={location.data.address}
                  latitude={
                    location.data.displayCoordinate
                      ? location.data.displayCoordinate.latitude
                      : location.data.yextDisplayCoordinate.latitude
                  }
                  longitude={
                    location.data.displayCoordinate
                      ? location.data.displayCoordinate.longitude
                      : location.data.yextDisplayCoordinate.longitude
                  }
                />
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import GetDirection from "../commons/GetDirection";
import timesvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import { StaticData } from "../../sites-global/staticData";
import Availability from "../locationDetail/Availability";
import { Link } from "@yext/pages/components";
import { useEffect } from "react";
import useGetPostalCodeLatLng from "../../hooks/useGetPostalCodeLatLng";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchState } from "@yext/search-headless-react";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<Location> = (props: any) => {
  const [hoursopen, setHoursopen] = React.useState(false);
  console.log("props", props);
  let url = "";
  function opentime(e: any) {
    const closethis = e.target.closest(".lp-param-results");
    if (
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.contains("hidden")
    ) {
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.remove("hidden");
      setHoursopen(true);
    } else {
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.add("hidden");
      setHoursopen(false);
    }
  }
  return props.result.map((result: any, keyindex: number) => {
    const { address } = result.rawData;
    const name: any = result.rawData.geomodifier?.toLowerCase();
    const string: any = name.toString();
    const result1: any = string.replaceAll(" ", "-");
    if (!result.rawData.slug) {
      url = `/${result.rawData.id}-${result1}.html`;
    } else {
      url = `/${result.rawData.slug.toString()}.html`;
    }

    return (
          <div
            className={`location result-list-inner-${keyindex + 1} result`}
            id={`result-${keyindex + 1}`}
          >
            <div className="result-inner ">
              <div className="center-column">
                <div className="lp-param-results lp-subparam-hours">
                  <div className="location-name-miles icon-row">
                    <div className="icon text-black svg-map-icn relative">
                      {" "}
                      <svg
                        id="Vector"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="28"
                        viewBox="0 0 29 38"
                      >
                        <path
                          id="Path_189"
                          data-name="Path 189"
                          d="M29,14.271c0,6.541-8.836,18.062-12.763,22.893a2.3,2.3,0,0,1-3.549,0C8.76,32.333,0,20.812,0,14.271A14.343,14.343,0,0,1,14.5,0,14.391,14.391,0,0,1,29,14.271Z"
                        />
                      </svg>
                      <span className="map-count"> {keyindex + 1}</span>
                    </div>
                    <h2>
                      <Link
                        className="inline-block notHighlight"
                        data-ya-track={`viewDetail -${result.rawData.geomodifier}`}
                        eventName={`viewDetail -${result.rawData.geomodifier}`}
                        rel="noopener noreferrer"
                        href={url}
                      >
                        {result.rawData.geomodifier}
                      </Link>
                    </h2>
                    {typeof result.distance != "undefined" ? (
                      <div className="distance">
                        {metersToMiles(result.distance)}{" "}
                        <span>{StaticData.miles}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="icon-row content-col address-with-availablity notHighlight">
                    <Address address={address} />

                    <div className="mt-2">
                      {result.rawData.hours?.reopenDate ? (
                        <>
                          <div className="icon">
                            {" "}
                            <img
                              className=" "
                              src={timesvg}
                              width="20"
                              height="20"
                              alt=""
                            />{" "}
                          </div>
                          <div
                            className="cursor-pointer flex open-now-string items-center "
                            data-id={`main-shop-${result.rawData.id}`}
                            onClick={opentime}
                          >
                            {StaticData.tempClosed}
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className=" notHighlight flex open-now-string items-center"
                            data-id={`main-shop-${result.rawData.id}`}
                          >
                            <OpenClose
                              timezone={result.rawData.timezone}
                              hours={result.rawData.hours}
                              deliveryHours={result.rawData.hours}
                            ></OpenClose>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="availablity-content">
                      <Availability
                        c_openForShoppingAvailibility={
                          result.rawData.c_open_for_shopping
                        }
                        c_clickCollectAvaliability={
                          result.rawData.c_click_collect_availability
                        }
                        c_parking_facilities={
                          result.rawData.c_parking_facilities
                        }
                        c_fitting_rooms={result.rawData.c_fitting_rooms}
                        hours={result.rawData.hours}
                      />
                    </div>
                  </div>

                  <div className="button-bx">
                    <Link
                      type="button"
                      href={url}
                      className=" btn notHighlight "
                      data-ya-track={`viewStore -${result.rawData.geomodifier}`}
                      eventName={`viewStore -${result.rawData.geomodifier}`}
                      rel="noopener noreferrer"
                    >
                      {StaticData.StoreDetailbtn}
                    </Link>
                    {result.rawData.displayCoordinate ? (
                      <GetDirection
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={result.rawData.displayCoordinate?.latitude}
                        longitude={result.rawData.displayCoordinate?.longitude}
                      />
                    ) : (
                      <GetDirection
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={
                          result.rawData.yextDisplayCoordinate?.latitude
                        }
                        longitude={
                          result.rawData.yextDisplayCoordinate?.longitude
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) 
  });
};

export default LocationCard;

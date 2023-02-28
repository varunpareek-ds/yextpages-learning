import * as React from "react";
import Hours from "../commons/hours";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../sites-global/staticData";
import Availability from "./Availability";
import Model from "./Model";
import CustomMap from "./CustomMap";

const Contact = (props: any) => {
  const {
    address,
    phone,
    latitude,
    longitude,
    hours,
    c_specific_day,
    additionalHoursText,
    c_openForShoppingAvailibility,
    c_clickCollectAvaliability,
    c_parking_facilities,
    c_fitting_rooms,
    yextDisplayCoordinate,
    c_storeInfoHeading,
    c_getDirectionsCTAText,
  } = props;
  return (
    <>
      <div className="address-main-sec">
        <h4 className="box-title">
          {c_storeInfoHeading ? c_storeInfoHeading : "Store Details"}
        </h4>

        <div className="icon-row content-col">
          <div className="icon">
            {" "}
            <img
              className=" "
              src={mapimage}
              width="20"
              height="20"
              alt="mapimage"
            />
          </div>
          <div className="  address-text notHighlight">
            {address.line1}
            <div>{address.line2 && <div>{address.line2}</div>}</div>
            <div>{address.city}</div>
            <div>{address.postalCode}</div>
          </div>
        </div>

        {phone ? (
          <div className="icon-row">
            <div className="icon">
              {" "}
              <img
                className=" "
                src={Phonesvg}
                width="22"
                height="22"
                alt="phonesvg"
              />
            </div>
            <div className="content-col">
              <a id="address" className=" location-phn" href={`tel:${phone}`}>
                {phone}
              </a>
            </div>
          </div>
        ) : (
          ""
        )}

        <ul className="">
          <li className="button-bx direction-button">
            <GetDirection
              buttonText={
                c_getDirectionsCTAText
                  ? c_getDirectionsCTAText
                  : StaticData.getDirection
              }
              address={address}
              latitude={latitude}
              longitude={longitude}
            />
          </li>
        </ul>

        <div className="map-sec">
          <CustomMap prop={yextDisplayCoordinate} />
        </div>

        <h4 className="box-title mt-8 !mb-0">Store Facilities</h4>

        <div className="icon-row content-col availability-col">
          <Availability
            c_openForShoppingAvailibility={c_openForShoppingAvailibility}
            c_clickCollectAvaliability={c_clickCollectAvaliability}
            c_parking_facilities={c_parking_facilities}
            c_fitting_rooms={c_fitting_rooms}
            hours={hours}
          />
        </div>
      </div>

      {hours && typeof hours.monday != "undefined" ? (
        <div className="hours">
          <div className="hours-sec">
            <div className="title-with-link-1">
              <h4 className="box-title">{"Store Opening Hours"}</h4>
            </div>
            <div className="hours-div mb-5 md:mb-1 flex flex-col">
              {hours.holidayHours && typeof hours.reopenDate == "undefined" ? (
                <>
                  <Model
                    name={StaticData.Holdiay}
                    holidayHours={hours.holidayHours}
                    c_specific_day={c_specific_day}
                  />
                </>
              ) : (
                ""
              )}

              {hours && (
                <Hours
                  title={"Store Opening Hours"}
                  additionalHoursText={additionalHoursText}
                  hours={hours}
                  c_specific_day={c_specific_day}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;

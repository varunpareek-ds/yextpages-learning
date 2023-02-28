import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState, Result } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  AnswerExperienceConfig,
  apiKey,
  center_latitude,
  center_longitude,
  experienceKey,
  googleApikey,
  search_icn,
  UseMylocationsvg,
  verticalKey,
} from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";
import VerticalResults from "../VerticalResults";
import ResultsCount from "./ResultsCount";
import useFetchResults from "../../hooks/useFetchResults";
import useGetPostalCodeLatLng from "../../hooks/useGetPostalCodeLatLng";
const params1: any = { latitude: center_latitude, longitude: center_longitude };
let mapzoom = 8;
const centerLatitude = center_latitude;
const centerLongitude = center_longitude;
const SearchLayout = (props: any): JSX.Element => {
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useFetchResults() || [];
  const locationinbuit =
    useSearchState((state) => state.vertical?.results) || [];
  const [startgeocode, setStartGeoCode] = useState(false);
  const [displaymsg, setDisplaymsg] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [forgeoinput, setForGeoInput] = useState("");
  const [postalLoading, setPostalLoading] = useState(false);
  const { postalcode } = useGetPostalCodeLatLng();
  const [mobile, setMobile] = useState(false);
  const [allowlocation, setallowLocation] = React.useState("");
  const [allowresult, setAllowResult] = useState(false);
  const searchActions = useSearchActions();
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const onClick = () => {
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation("Please allow your Location");
        }
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          Geocode.setApiKey(googleApikey);
          const inputformat = "";
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                filterRef.current &&
                  filterRef.current.setInputValue(
                    response.results[0].formatted_address
                  );
                setallowLocation("");
                setAllowResult(true);
              }
            },
            (error: any) => {
              console.error(error);
            }
          );

          const params = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          mapzoom = 3;
          searchActions.setVertical("locations");
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();          
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  const Findinput = () => {
    const searchKey: any = document.getElementsByClassName("FilterSearchInput");
    const Search = searchKey[0].value;

    setInputValue("");
    if (searchKey[0].value != "") {
      setForGeoInput(Search);
      getCoordinates(Search);
      setStartGeoCode(true);
    }

    if (locationinbuit.length == 0 && !loading) {
      setDisplaymsg(true);
    } else {
      setDisplaymsg(false);
    }
  };

  const handleInputValue = () => {
    setInputValue("");
  };
  const handleSetUserShareLocation = (value: any, userShareStatus: boolean) => {
    setInputValue(value);
    if (userShareStatus) {
    }
  };

  async function getCoordinates(address: string) {
    setInputValue("");
    setPostalLoading(true);
    postalcode(address, params1);
    // const url = `https://liveapi.yext.com/v2/accounts/me/answers/vertical/query?experienceKey=${experienceKey}&api_key=${apiKey}&v=20220511&version=STAGING&locale=en_GB&input=${address}&location=${centerLatitude},${centerLongitude}&verticalKey=${verticalKey}&offset=0&retrieveFacets=true&facetFilters=%7B%7D&skipSpellCheck=false&sortBys=%5B%5D&source=STANDARD`;

    // const customApiData = await fetch(url).then((res) => res.json());
    // if (customApiData.response && customApiData.response.results.length > 0) {

    // }else{
    //   postalcode(address, params1);
    // }
      // searchActions.setQuery(address);
      // searchActions.setUserLocation(params1);
      // searchActions.setOffset(0);
      // searchActions.executeVerticalQuery();
      // setPostalLoading(false);
    // } else {
    //   postalcode(address, params1);
    //   setInputValue(address)
    //   setPostalLoading(true);
    // }
  }

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setMobile(true);
  };

  useEffect(() => {
    if (locationinbuit.length > 0) {
      setDisplaymsg(false);
    }
  }, [locationinbuit]);

  useEffect(() => {
    locationResults.map((result: any, index: number) => {
      const resultelement = document.querySelectorAll(
        `.result-list-inner-${index + 1}`
      );
      for (let index = 0; index < resultelement.length; index++) {
        if (
          resultelement[index].classList.contains("active") ||
          resultelement[index].classList.contains("fixed-hover")
        ) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      }
    });
  }, [loading]);

  return (
    <>
      <div className="breadcrumb">
        <div className="container-custom">
          <ul>
            <li>
              <a href="#" className="home">
                {" "}
                Home
              </a>
            </li>
            <li>{StaticData.locator_breadcrumb}</li>
          </ul>
        </div>
      </div>
      <div className="locator-main">
        {allowlocation.length > 0 ? (
          <div className="for-allow">{allowlocation}</div>
        ) : (
          ""
        )}
        <div className="search-bx">
          <div className="location-with-filter">
            <h1 className="">{StaticData.FindLocationtext}</h1>
          </div>

          <div className="search-field">
            <FilterSearch
              ref={filterRef}
              displaymsg={displaymsg}
              getCoordinates={getCoordinates}
              setPostalLoading={setPostalLoading}
              setDisplaymsg={setDisplaymsg}
              customCssClasses={{
                filterSearchContainer: "m-2 w-full",
                inputElement: "FilterSearchInput pr-[90px]",
                optionsContainer: "options",
              }}
              setAllowResult={setAllowResult}
              inputvalue={inputvalue}
              setSearchInputValue={setInputValue}
              params={params1}
              startgeocode={startgeocode}
              setStartGeoCode={setStartGeoCode}
              searchFields={[
                {
                  entityType: "location",
                  fieldApiName: "address.postalCode",
                },
                {
                  entityType: "location",
                  fieldApiName: "address.city",
                },
                {
                  entityType: "location",
                  fieldApiName: "address.region",
                },
              ]}
              handleInputValue={handleInputValue}
              handleSetUserShareLocation={handleSetUserShareLocation}
              label={""}
              sectioned={false}
              searchInputValue={undefined}
            />

            <button
              className="search-btn"
              aria-label="Search bar icon"
              id="search-location-button"
              onClick={Findinput}
            >
              <span dangerouslySetInnerHTML={{ __html: search_icn }} />
            </button>
          </div>

          <div className="fliter-sec">
            <button
              className="useMyLocation"
              title="Search using your current location!"
              id="useLocation"
              onClick={onClick}
            >
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: UseMylocationsvg }}
              />
              {isSmallScreen ? (
                <span className="underline hover:no-underline">
                  {" "}
                  {StaticData.Usemylocation}
                </span>
              ) : (
                <span className="underline hover:no-underline">
                  {" "}
                  {StaticData.UsemylocationDesktop}
                </span>
              )}
            </button>

            <ResultsCount
              customCssClasses={{
                container: "mx-2 my-0 text-dark-gray pt-5 sm:pt-0",
              }}
              postalLoading={postalLoading}
              allowresult={allowresult}
              inputvalue={inputvalue}
            />
          </div>
        </div>
        <div className="mobile-btns">
          <div className="button-bx">
            <a
              className="btn listBtn"
              href="javascript:void(0);"
              onClick={() => {
                document.body.classList.remove("mapView");
              }}
            >
              {" "}
              List View
            </a>
            <a
              className="btn mapBtn"
              href="javascript:void(0);"
              onClick={addClass}
            >
              {" "}
              Map View
            </a>
          </div>
        </div>
        <div className=" map-section ">
          <GoogleMaps
            mobile={mobile}
            setMobile={setMobile}
            apiKey={googleApikey}
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            check={true}
            defaultZoom={mapzoom}
            showEmptyMap={true}
          />
        </div>

        <div className="left-listing">
          <PerfectScrollbar>
            <div>
              <VerticalResults
                displayAllOnNoResults={false}
                CardComponent={LocationCard}
                postalLoading={postalLoading}
                locationResults={locationResults}
                customCssClasses={{
                  container:
                    "result-list flex flex-col scroll-smooth  overflow-auto",
                }}
              />

              {locationResults && locationResults.length <= 0 ? (
                <div className="browse-dir">
                  <a className="underline " href="/gb.html">
                    Use the search above or
                    <span className="font-second-main-font">
                      browse our directory
                    </span>
                  </a>
                </div>
              ) : (
                ""
              )}
              <div className="button-bx">
                <ViewMore
                  className={
                    " btn notHighlight lg:!w-[132%] !mb-2 button view-more"
                  }
                  idName={"view-more-button"}
                  buttonLabel={"View More"}
                />
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
};

export default SearchLayout;

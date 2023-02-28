import { useState, useEffect } from "react";
import { useSearchState } from "@yext/search-headless-react";
import { useSearchActions } from "@yext/search-headless-react";
import { googleApikey } from "../sites-global/global";

const useGetPostalCodeLatLng = () => {
  const locationResults = useSearchState((s) => s.vertical.results) || [];
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  const searchActions = useSearchActions();
  const [postalloading, setPostalLoading] = useState(false);
  //   useEffect(()=>{
  // Hello=false;
  //   },[Hello])
  //   useEffect(()=>{
  //     Hello=true;
  //       },[])

  const setLoading = (value: boolean) => {
    setPostalLoading(value);
  };

  const postalcode = (
    postal: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postal},UK&key=${googleApikey}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json, "json");
        if (json.status === "ZERO_RESULTS") {
          searchActions.setQuery("gkhvfdjgbdbg");
          searchActions.setUserLocation(coordinates);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();
        } else if (json.results) {
          json.results.map((components: any) => {
            for (let i = 0; i < components.address_components.length; i++) {
              const type = components.address_components[i].types[0];

              // switch (type) {
              //   case "postal_code": {
              //     console.log("locationresult", locationResults.length);
              //     console.log("yes", locationResults.length);
                  const params = {
                    latitude: components.geometry.location.lat,
                    longitude: components.geometry.location.lng,
                  };
                  console.log("yes", components.geometry.location);
                  searchActions.setUserLocation(params);
                  searchActions.setQuery("");
                  searchActions.executeVerticalQuery();
                //   break;
                // }
                // default: {
                // }
              // }
            }
          });
        }
      })
      .catch((error: any) => {});
  };

  return { postalcode, setLoading, postalloading };
};

export default useGetPostalCodeLatLng;

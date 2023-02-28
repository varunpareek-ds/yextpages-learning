import { Link } from "@yext/pages/components";
import * as React from "react";
import abbanner from "../../images/ab-banner.jpg"
import dt12 from "../../images/dtl2.jpg"
import PhotoSlider from "./PhotoSlider"
import RtfConverter from "@yext/rtf-converter";
import { useEffect, useState } from "react";

export default function About(props: any) {
  const [isReadMore, setIsReadMore] = useState(true);
  function convertToRtf(rtf:any) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
    rtf=rtf.replace('/','');
    rtf=rtf.replace(';','');
    rtf=rtf.replace('-','');
    return rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
}
const [isSmallScreen, setIsSmallScreen] = useState(false);
useEffect(() => {
  // const mediaQuery = window.matchMedia("(max-width: 1024px)").matches;
  const mediaQuery =window.matchMedia('(min-width:1024px) and (max-width: 1300px)');
  // setIsSmallScreen(!mediaQuery && !tablet);
  console.log(mediaQuery)
  mediaQuery.addListener(handleMediaQueryChange);
  handleMediaQueryChange(mediaQuery);

  return () => {
    mediaQuery.removeListener(handleMediaQueryChange);
  };
},[isSmallScreen]);

const handleMediaQueryChange = (mediaQuery:any) => {
  if (mediaQuery.matches) {
    setIsSmallScreen(true);
  } else {
    setIsSmallScreen(false);
  }
};
  return (
    <>
      <div className="about-sec ">
      <div className="container-custom">
        <div className="about-inner-sec">
        <h2 className="for-mob">{props.name}</h2>

          <div className="w-full lg:w-2/5 xl:w-[47%] relative  left-0">
              <div className="lg:h-full">
              {props.photoGallery ?
                    props.photoGallery.map((element:any) => (   

                        <img height={518} width={658} src={element.url} alt="photo" />
                  
                      ))
                    : ''}
              </div>
          </div>
          <div className="about-content">
            <div className="mb-0">
              <h2>{props.name}</h2>
              <div className="">
              {isSmallScreen ? 
              <div class="about-content-inner" dangerouslySetInnerHTML={{__html: convertToRtf(props.description.slice(0, 350))}}/>
               : <div class="about-content-inner" dangerouslySetInnerHTML={{__html: convertToRtf(props.description)}}/>}
               <span  className="read-or-hide">
              </span>
              </div>
              
              {props.c_viewMore.link&&props.c_viewMore.label?
              <div className="content-center w-full ">
                <Link href={props.c_viewMore.link} className="button-red"
                 data-ya-track={`about-button`}
                 eventName={`about-button`}
                 rel="noopener noreferrer"
                >{props.c_viewMore.label}</Link>
              </div>
              :''}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )


}
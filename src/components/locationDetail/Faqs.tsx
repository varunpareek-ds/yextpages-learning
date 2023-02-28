import * as React from "react";
import { useState, useEffect } from "react";
import AccordionItem from "./AccordianItem";
import { StaticData } from "../../sites-global/staticData";


export default function Faq(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  let preExpandedarr = [];

  if (props.faqs.length > 0) {
    props.faqs.map((e: any, i: Number) => {
      if (i == 0) {
        preExpandedarr = [e];
      }
    });
  }

  const renderedQuestionsAnswers = props.faqs.map((item: any, index: number) => {
    const showDescription = index === activeIndex ? "current" : "hidden";
    const background = index === activeIndex ? "active" : "";
    const fontWeightBold = index === activeIndex ? " font-weight-bold  py-0 mt-2" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        background={background}
        item={item}
        index={index}
        onClick={() => {
          setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <>
      <div className=" faq-main-sec">
        <div className=" faq-card ">
          <div className="faq-sec-inner">
            <h2 className="">{props.c_fAQsHeading?props.c_fAQsHeading:StaticData.FAQheading}</h2>
            <div className="faq-tabs">{renderedQuestionsAnswers}</div>
          </div>
        </div>
      </div>
    </>
  );
}
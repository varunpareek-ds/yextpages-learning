import * as React from "react";
import { StaticData } from "../../sites-global/staticData";
import { Link } from "@yext/pages/components";

export default function StoreHighlight(props: any) {
  return (
    <div className="container-custom mx-auto">
      <div className="sec-title">
        <h2>
          {props.c_storeHighlightsHeading
            ? `${props.c_store_name} ${props.c_storeHighlightsHeading}`
            : `${StaticData.Brandname} ${props.name} ${StaticData.Storehighlight}`}
        </h2>
      </div>

      <div className="services-inner">
        {props.c_storeHighlightInfo.map((res: any, i: number) => {
          return (
            <>
              {res.title && res.findOutMore.label ? (
                <div className="item" key={i}>
                  <div className="service-item">
                    <div className="service-img">
                      {res.image ? (
                        <img
                          src={res.image.image.url}
                          className="w-full"
                          height="250"
                          alt={res.image.image.url}
                        />
                      ) : (
                        <img
                          className="w-full"
                          src="http://a.mktgcdn.com/p-sandbox/PTjCS8rBXb9HTapnby2IEwQooHVJYvQqu7fhve2Gheo/1000x667.jpg"
                          height="250"
                          alt="url"
                        />
                      )}
                    </div>
                    <div className="service-desc-main">
                      <h3>{res.title}</h3>
                      <div className="service-desc">{res.description}</div>
                      {res.findOutMore.link && res.findOutMore.label ? (
                        <div className="button-bx !ml-0 mt-4">
                          <Link
                            className="btn"
                            href={res.findOutMore.link}
                            data-ya-track={`storehighlight`}
                            eventName={`storehighlight`}
                            rel="noopener noreferrer"
                          >
                            {res.findOutMore.label}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>{" "}
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

import * as React from "react";
import Contact from "../components/locationDetail/contact";
import Nearby from "../components/locationDetail/Nearby";
import { JsonLd } from "react-schemaorg";
import { nearByLocation } from "../types/nearByLocation";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import About from "../components/locationDetail/About";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import StoreHighlight from "../components/locationDetail/SoreHighlight";
import OpenClose from "../components/commons/openClose";
import Faq from "../components/locationDetail/Faqs";
import { StaticData } from "../sites-global/staticData";
import { AnswerExperienceConfig, apiKey, apikey_for_entity, baseuRL, experienceKey, stagingBaseurl, verticalKey,AnalyticsEnableDebugging,AnalyticsEnableTrackingCookie, favicon } from "../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";


/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "photoGallery",
      "description",
      "c_canonical",
      "c_meta_title",
      "c_meta_description",
      "c_about_us_image",
      "c_about_us_heading",
      "c_about_us_description",
      "c_viewMore",
      "c_store_name",
      "c_storeInfoHeading",
      "c_storeHighlightsHeading",
      "c_fAQsHeading",
      "c_store_highlights",
      "c_nearbyStoresHeading",
      "dm_directoryParents.name",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "c_banner_image",
      "additionalHoursText",
      "hours",
      "c_specific_day",
      "slug",
      "timezone",
      "c_related_fAQs.question",
      "c_related_fAQs.answer",
      "c_viewMoreFAQs",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "services",
      "c_click_collect_availability",
      "c_open_for_shopping",
      "c_parking_facilities",
      "c_fitting_rooms",
      "c_offerGallery",
      "geomodifier",
      "c_getDirectionsCTAText"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      savedFilterIds: ["1249533762"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.geomodifier.toLowerCase();
  var string: any = name.toString();;
  let result: any = string.replaceAll(" ", "-");
  if (!document.slug) {
    url += `${document.id}-${result}.html`;
  } else {
    url += `${document.slug.toString()}.html`;
  }

  return url;
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title?document.c_meta_title:` Matalan ${document.geomodifier} Store - Online Clothes Store`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description?document.c_meta_description:`Visit Matalan ${document.geomodifier} Store | Matalan is your local great value family retailer shop. Find latest seasonal looks for Women, Men and kids, plus a huge range of homeware.`}`,
        },
      },

     
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Matalan",
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${document._site.c_canonical?document.c_canonical:stagingBaseurl

            }${document.slug?document.slug:`${document.id}-${document.geomodifier.toLowerCase().replace(' ','-')}`}.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description?document.c_meta_description:`Visit Matalan ${document.geomodifier} Store | Matalan is your local great value family retailer shop. Find latest seasonal looks for Women, Men and kids, plus a huge range of homeware.`}`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: document.c_meta_title?document.c_meta_title:` Matalan ${document.geomodifier} Store - Online Clothes Store`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${document._site.c_canonical?document.c_canonical:stagingBaseurl
          }${document.slug?document.slug:`${document.id}-${document.geomodifier.toLowerCase().replace(' ','-')}`}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
          type: "meta",
          attributes: {
            name: "twitter:url",
            content: `${document._site.c_canonical?document.c_canonical:stagingBaseurl

            }${document.slug?document.slug:`${document.id}-${document.geomodifier.toLowerCase()}`}.html`,
          },
        },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description?document.c_meta_description:`Visit Matalan ${document.geomodifier} Store | Matalan is your local great value family retailer shop. Find latest seasonal looks for Women, Men and kids, plus a huge range of homeware.`}`,
        },
        
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: "https://a.mktgcdn.com/p-sandbox/VgddlDjYzDF07X3Tw-BttjNIoMwYUaCyslD_8Khf61E/2000x1333.jpg",
        },
      },
      /// twitter tag
    ],

  };
};
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {

  var location = `${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.latitude : data.document.displayCoordinate.latitude},${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.longitude : data.document.displayCoordinate.longitude}`;
    const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${experienceKey}&api_key=${apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=${verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;

  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()

  )) as nearByLocation;
  return { ...data, externalApiData };
};



type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};
/* destructure the data from Document*/
const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    id,
    name,
    address,
    slug,
    hours,
    c_specific_day,
    mainPhone,
    c_canonical,
    description,
    c_about_us_image,
    c_about_us_heading,
    c_about_us_description,
    dm_directoryParents,
    additionalHoursText,
    c_related_fAQs,
    c_clickCollectCta,
    c_viewMore,
    c_viewMoreFAQs,
    timezone,
    yextDisplayCoordinate,
    displayCoordinate,
    cityCoordinate,
    c_click_collect_availability,
    c_open_for_shopping,
    geomodifier,
    c_parking_facilities,
    c_fitting_rooms,
    c_store_name,
    c_storeInfoHeading,
    c_storeHighlightsHeading,
    c_fAQsHeading,
    c_store_highlights,
    c_nearbyStoresheading,
    c_getDirectionsCTAText,
  } = document;

  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];

  /* For Hours Schema here we push hours formate in hoursSchema array */
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema:any = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
        openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
        }else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } 
      hoursSchema.push(openIntervalsSchema);
    }
  }
  /* This is For Breadcrumb schema so here we push breadcrumb formate in breadcrumb array */
  document.dm_directoryParents &&
  document.dm_directoryParents.map((i: any, index: any) => {
    if (i.meta.entityType.id == "ce_country") {
      document.dm_directoryParents[index].name = document.dm_directoryParents[index].name;
      document.dm_directoryParents[index].slug = document.dm_directoryParents[index].slug;
      breadcrumbScheme.push({
        "@type": "ListItem",
        position: index,
        item: {
          "@id": stagingBaseurl + document.dm_directoryParents[index].slug + ".html",
          name: i.name,
        },
      });
    } else if (i.meta.entityType.id == "ce_region") {
      let url = "";
      document.dm_directoryParents.map((j: any) => {
        if (j.meta.entityType.id != "ce_region" && j.meta.entityType.id != "ce_city" && j.meta.entityType.id != "ce_root") {
          url = url  + j.slug;
        }
      });
      breadcrumbScheme.push({
        "@type": "ListItem",
        position: index,
        item: {
          "@id": stagingBaseurl + url + "/" + document.dm_directoryParents[index].slug + ".html",
          name: i.name,
        },
      });
    } else if (i.meta.entityType.id == "ce_city") {
      let url = "";
      document.dm_directoryParents.map((j: any) => {
        if (j.meta.entityType.id != "ce_city" && j.meta.entityType.id != "ce_root" ) {
          url = url  + "/" + j.slug;
        }
      });
      breadcrumbScheme.push({
        "@type": "ListItem",
        position: index,
        item: {
          "@id": stagingBaseurl + url +"/" + document.dm_directoryParents[index].slug + ".html",
          name: i.name,
        },
      });
    }
  });

  breadcrumbScheme.push({
  "@type": "ListItem",
  position: 4,
  item: {
  "@id": stagingBaseurl + path,
  name: document.name,
  },
  });
 /* End breadcrumb schema   */

  return (
    <>
        {/* Department Schema  */}
          <JsonLd<Store>
            item={{
              "@context": "https://schema.org",
              "@type": "DepartmentStore",
              name: "Matalan",
              address: {
                "@type": "PostalAddress",
                streetAddress: address.line1,
                addressLocality: address.city,
                addressRegion: address.region,
                postalCode: address.postalCode,
                addressCountry: address.countryCode,
              },
              openingHoursSpecification: hoursSchema,
              description: description,
              telephone: mainPhone,
              url: `${c_canonical?c_canonical:stagingBaseurl}${slug?slug:`${id}-${geomodifier}`}.html`
            }}
          />

          {/* Breadcrumb Schema */}
          <JsonLd<BreadcrumbList>
            item={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbScheme,
            }}
          />  

          {/* Faq Schema  */}
          {c_related_fAQs ? (
            <>
              <JsonLd<FAQPage>
                item={{
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity:c_related_fAQs && c_related_fAQs.map((i: any) => {
                      return {
                        "@type": "Question",
                        name: i.question,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: `<p>${i.answer}</p>`,
                        },
                      };
                    }),
                      }}
              />
            </>
          ) : (
            <></>
          )}

        {/* Analytics Provider */}
        <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging} 
        enableTrackingCookie={AnalyticsEnableTrackingCookie}>
        
        <AnalyticsScopeProvider name={""}>

        {/*Our Header and Footer in pagelayout component  */}
        <PageLayout global={_site}>

        {/* BreadCrumb compoent  */}
        <BreadCrumbs
        name={geomodifier}
        parents={dm_directoryParents[3]}
        parentstate={dm_directoryParents[2]}
        parentcountry={dm_directoryParents[1]}
        baseUrl={relativePrefixToRoot} address={undefined} />

        <div className="container">
          <div className='banner-text banner-dark-bg justify-center text-center'>
            <h1 className="">{name} {geomodifier}</h1>
              <div className="openClosestatus detail-page closeing-div">
                <OpenClose timezone={timezone} hours={hours} />
              </div> 
          </div>
        </div>
        <div className="location-information">
          <Contact address={address} c_openForShoppingAvailibility={c_open_for_shopping} 
          c_storeInfoHeading={c_storeInfoHeading}
          c_getDirectionsCTAText={c_getDirectionsCTAText}
          c_clickCollectAvaliability={c_click_collect_availability}
          c_parking_facilities={c_parking_facilities} c_fitting_rooms={c_fitting_rooms}
          c_clickCollectCta={c_clickCollectCta} phone={mainPhone} 
          latitude={yextDisplayCoordinate ? yextDisplayCoordinate.latitude : displayCoordinate?.latitude}
          yextDisplayCoordinate={yextDisplayCoordinate} 
          longitude={yextDisplayCoordinate ? yextDisplayCoordinate.longitude : displayCoordinate?.longitude} 
          hours={hours} c_specific_day={c_specific_day} additionalHoursText={additionalHoursText} >
          </Contact>

          {hours ?
              <div className="map-sec" >
                <CustomMap prop={ yextDisplayCoordinate || displayCoordinate} />
              </div> :
              <div className="map-sec without-hours">
                <CustomMap prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate} />
              </div>}
        </div>

        {/* Store Highlight Section */}
        {c_store_highlights &&
        <div className="services-sec">  
          <StoreHighlight c_store_name={c_store_name} c_storeHighlightsHeading={c_storeHighlightsHeading} c_storeHighlightInfo={c_store_highlights} name={name} />
        </div>}

        {/* About US Secition */}
        {c_about_us_description&&c_about_us_heading ?
          <About name={c_about_us_heading} c_viewMore={c_viewMore} photoGallery={c_about_us_image} description={c_about_us_description} />
        : ''}


        {/* Faq Section */}
        <div className="faq-sec">
          {c_related_fAQs && (      
              <Faq c_fAQsHeading={c_fAQsHeading} faqs={c_related_fAQs} c_viewMoreFAQs={c_viewMoreFAQs} />
          ) }
        </div>

        {/* Nearby Section */}
        <div className="nearby-sec">
          <div className="container-custom">
            <div className="sec-title"><h2 className="">{c_nearbyStoresheading?c_nearbyStoresheading:StaticData.NearStoretext}</h2></div>
            <div className="nearby-sec-inner">
              {yextDisplayCoordinate || cityCoordinate || displayCoordinate ?
                <Nearby c_getDirectionsCTAText={c_getDirectionsCTAText}  externalApiData={externalApiData} />: ''}
            </div>
          </div>
        </div>

        </PageLayout>
        </AnalyticsScopeProvider>
        </AnalyticsProvider>
  </>
  );
};

export default Location;
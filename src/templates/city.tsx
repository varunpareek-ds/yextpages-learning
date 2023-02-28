import * as React from "react";
import GetDirection from "../components/commons/GetDirection";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import { StaticData } from "../sites-global/staticData";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
  stagingBaseurl,
} from "../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";
import Availability from "../components/locationDetail/Availability";
import OpenClose from "../components/commons/openClose";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
export const config: TemplateConfig = {
  stream: {
    $id: "matlan-city",
    filter: {
      entityTypes: ["ce_city"],
      savedFilterIds: ["dm_matalan-stores-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_canonical",
      "c_meta_title",
      "c_banner_image",
      "c_bannerHeading",
      "c_meta_description",
      "dm_directoryParents.name",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.timezone",
      "dm_directoryChildren.c_open_for_shopping",
      "dm_directoryChildren.c_click_collect_availability",
      "dm_directoryChildren.c_parking_facilities",
      "dm_directoryChildren.c_fitting_rooms",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.geomodifier",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url: any = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    } else if (i.meta.entityType.id == "ce_region") {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`;
    }
  });
  return url;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let canonical = "";
  document.dm_directoryChildren.map((entity: any) => {
    canonical =
      entity.address.countryCode.toLowerCase().replaceAll(" ", "-") +
      "/" +
      entity.address.region.toLowerCase().replaceAll(" ", "-");
  });

  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `Matalan Stores in ${document.name} | Find a Local Store`
    }`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Use this page to find your nearest Matalan store in ${document.name} and discover the location details you need to visit us today.`
          }`,
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
          name: "author",
          content: "MATALAN",
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
          href: `${
            document.c_canonical
              ? document.c_canonical +
                "/" +
                canonical +
                "/" +
                document.slug +
                ".html"
              : stagingBaseurl
              ? stagingBaseurl + canonical + "/" + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },
      // /og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${
            document.c_canonical
              ? document.c_canonical +
                "/" +
                canonical +
                "/" +
                document.slug +
                ".html"
              : stagingBaseurl
              ? stagingBaseurl + canonical + "/" + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Use this page to find your nearest Matalan store in ${document.name} and discover the location details you need to visit us today.`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
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
          content: `${
            document.c_canonical
              ? document.c_canonical +
                "/" +
                canonical +
                "/" +
                document.slug +
                ".html"
              : stagingBaseurl
              ? stagingBaseurl + canonical + "/" + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Use this page to find your nearest Matalan store in ${document.name} and discover the location details you need to visit us today.`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content:
            "https://a.mktgcdn.com/p-sandbox/VgddlDjYzDF07X3Tw-BttjNIoMwYUaCyslD_8Khf61E/2000x1333.jpg",
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  __meta,
  document,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    _site,
  } = document;

  const templateData = { document: document, __meta: __meta };
  let address;
  let slugString = "";
  document.dm_directoryParents.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren.map((entity: any) => {
    let url = "";
    const name: any = entity.geomodifier.toLowerCase();
    const string: any = name.toString();
    const result: any = string.replaceAll(" ", "-");
    if (!entity.slug) {
      url = `/${entity.id}-${result}.html`;
    } else {
      url = `/${entity.slug.toString()}.html`;
    }

    return (
      <div className="nearby-card">
        <div className="location-name-miles icon-row">
          <h2>
            <Link
              className="inline-block notHighlight"
              href={url}
              data-ya-track={`viewstore-${entity.geomodifier}`}
              eventName={`viewstore-${entity.geomodifier}`}
              rel="noopener noreferrer"
            >
              {entity.geomodifier}
            </Link>
          </h2>
        </div>
        <div className="icon-row">
          <Address address={entity.address} />
        </div>

        <div className="icon-row">
          <div className="content-col open-now-string">
            {typeof entity.hours?.reopenDate != "undefined" ? (
              <h6>{StaticData.tempClosed}</h6>
            ) : (
              <OpenClose timezone={entity.timezone} hours={entity.hours} />
            )}
          </div>
        </div>
        <div className="icon-row content-col availability-col">
          <Availability
            c_openForShoppingAvailibility={entity.c_open_for_shopping}
            c_clickCollectAvaliability={entity.c_click_collect_availability}
            c_parking_facilities={entity.c_parking_facilities}
            c_fitting_rooms={entity.c_fitting_rooms}
            hours={entity.hours}
          />
        </div>

        <div className="button-bx">
          <Link
            className="btn"
            href={url}
            data-ya-track={`viewstore-${entity.name}`}
            eventName={`viewstore-${entity.name}`}
            rel="noopener noreferrer"
          >
            {StaticData.StoreDetailbtn}
          </Link>
          <GetDirection
            buttonText={StaticData.getDirection}
            address={entity.address}
            latitude={entity.yextDisplayCoordinate.latitude}
            longitude={entity.yextDisplayCoordinate.longitude}
          />
        </div>
      </div>
    );
  });

  let url: any = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    } else if (i.meta.entityType.id == "ce_region") {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`;
    }
  });
  const breadcrumbScheme: any = [];

  document.dm_directoryParents &&
    document.dm_directoryParents.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              +document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 3,
    item: {
      "@id": `${stagingBaseurl}${path}`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Matalan",
          //   url: _site.c_canonical,
          // logo: `${document.c_ogImage ? document.c_ogImage.map((result:any)=>{return result.url}) : ""}`
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <PageLayout global={_site}>
            <BreadCrumbs
              name={name}
              address={address}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              parentstate={undefined}
              parentcountry={undefined}
            ></BreadCrumbs>

            <div className="content-list city-page">
              <div className="container-custom mx-auto">
                <div className="sec-title">
                  <h1>
                    {StaticData.AllStores} {name}
                  </h1>
                </div>
                <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem]">
                  <div className="nearby-sec-inner">{childrenDivs}</div>
                </div>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default City;

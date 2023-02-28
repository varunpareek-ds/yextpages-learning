import * as React from "react";
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
import PageLayout from "../components/layouts/PageLayout";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
  stagingBaseurl,
} from "../sites-global/global";
import { StaticData } from "../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import { JsonLd } from "react-schemaorg";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "region",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      "c_canonical",
      "c_meta_title",
      "c_banner_image",
      "c_bannerHeading",
      "c_meta_description",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.geomodifier",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_region"],
      savedFilterIds: ["dm_matalan-stores-directory_address_region"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url += i.slug + "/";
    }
  });
  url += document.slug.toString();

  return url + ".html";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let canonical = "";
  document.dm_directoryParents.map((entity: any) => {
    canonical = entity.slug.toLowerCase();
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
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
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
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "keywords",
          content: document.name,
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
      //   // /og tags

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
          content: `${
            document.c_meta_title
              ? document.c_meta_title
              : `Matalan Stores in ${document.name} | Find a Local Store`
          }`,
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
          name: "twitter:image",
          content:
            "https://a.mktgcdn.com/p-sandbox/VgddlDjYzDF07X3Tw-BttjNIoMwYUaCyslD_8Khf61E/2000x1333.jpg",
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
    ],
  };
};

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  __meta,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  const templateData = { document: document, __meta: __meta };
  const childrenDivs = dm_directoryChildren.map((entity: any) => {
    let url: any = "";
    url = document.slug.toString();
    let url1: any = "";
    url1 = url.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim();

    let detlslug;
    if (entity.dm_directoryChildrenCount == 1) {
      entity.dm_directoryChildren.map((res: any) => {
        const result: any = res.geomodifier.replaceAll(" ", "-");
        if (typeof res.slug != "undefined") {
          detlslug = res.slug;
        } else {
          detlslug = `/${res.id}-${result.toLowerCase()}.html`;
        }
      });
    } else {
      dm_directoryParents.map((i: any, index: any) => {
        detlslug = "/" + i.slug + "/" + slug + "/" + entity.slug + ".html";
      });
    }

    return (
      <li className="storelocation-category">
        <Link
          key={entity.slug}
          href={detlslug}
          data-ya-track={`dm-${entity.name}`}
          eventName={`dm-${entity.name}`}
          rel="noopener noreferrer"
        >
          {entity.name} ({entity.dm_directoryChildrenCount})
        </Link>
      </li>
    );
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
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 2,
    item: {
      "@id": `${stagingBaseurl}${path}`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Matalan",
        }}
      />
      <JsonLd
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
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              address={address} parentstate={undefined} parentcountry={undefined}            ></BreadCrumbs>

            <div className="content-list">
              <div className="container-custom">
                <div className="sec-title">
                  <h1 style={{ textAlign: "center" }}>
                    {StaticData.AllStores} {name}
                  </h1>
                </div>
                <ul className="region-list">{childrenDivs}</ul>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default region;

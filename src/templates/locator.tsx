import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import PageLayout from "../components/layouts/PageLayout";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  experienceKey,
  apiKey,
  verticalKey,
  stagingBaseurl,
  AnswerExperienceConfig,
  logo,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../sites-global/global";
import Newsletter from "../components/locatorPage/Newsletter";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";

export const config: TemplateConfig = {
  stream: {
    $id: "Locator",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      // "c_canonical",
      // "c_meta_title",
      // "c_meta_description",
      // "c_locatorBannerImage",
      // "c_locatorTitleH1",
      // "c_locator_description",
      // "c_matalan_header_logo",
      // "c_header_links",
      // "c_footerDescription",
      // "c_customer_services",
      // "c_matalan_mobile_view_header_logo",
      // "c_about_matalan",
      // "c_our_website",
      // "c_socialIcons",
      // "c_appSectionText",
      // "c_app_icon",
      // "c_matalan_footer_logo",
      // "c_fAQs",
      // "c_store_finder",
      // "richTextDescription",
      // "c_top_header_links",
      // "c_paySecurelyIcon",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["global-data"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `${
      document.c_meta_title ? document.c_meta_title : StaticData.Meta_title
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
              : StaticData.Meta_description
          }`,
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
          rel: "shortcut icon",
          href: `https://www.matalan.co.uk/assets/favicon-f338a10eae042f47c9a3ee119cde59c2ded0a0a45db4da3c09f7937309ebf169.ico`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document._site.c_canonical ? document.c_canonical : stagingBaseurl
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl}`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : StaticData.Meta_description
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
              : StaticData.Meta_title
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `https://a.mktgcdn.com/p-sandbox/VgddlDjYzDF07X3Tw-BttjNIoMwYUaCyslD_8Khf61E/2000x1333.jpg`,
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
          content: `${stagingBaseurl}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : StaticData.Meta_description
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

const Locator: Template<TemplateRenderProps> = ({ __meta, document }) => {
  const { _site } = document;

  const templateData = { document: document, __meta: __meta };
  return (
    <>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MATALAN",
          url: stagingBaseurl,
          logo: logo,
        }}
      />
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "Home/Storelocator",
              name: "Home",
            },
          },
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name={""}>
          <PageLayout global={_site}>
            <SearchHeadlessProvider
              experienceKey={experienceKey}
              locale={AnswerExperienceConfig.locale}
              apiKey={apiKey}
              verticalKey={verticalKey}
              experienceVersion="STAGING"
              sessionTrackingEnabled={true}
              endpoints={AnswerExperienceConfig.endpoints}
            >
              <SearchLayout _site={_site} />
            </SearchHeadlessProvider>
            <Newsletter />
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Locator;

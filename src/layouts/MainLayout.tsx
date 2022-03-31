import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import tw, { GlobalStyles } from "twin.macro";

import { Container } from "@site/components";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./layout.css";
import { createGlobalStyle } from "styled-components";

type Props = {
  children: JSX.Element | JSX.Element[];
  location: Location;
};

const BaseStyles = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
    width: 100%;
  }

  body {
   background: #fbfbfb;
  }
`;

const Layout: React.FC<Props> = ({ children, location }) => {
  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: "Designer & Developer" },
          {
            name: "keywords",
            content:
              "tyler,nickerson,nickersoft,design,music,software,coding,frontend,web",
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <BaseStyles />
      <GlobalStyles />
      <div tw="flex flex-col min-h-full">
        <Header location={location} />
        <Container tw="flex-grow relative p-0">{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

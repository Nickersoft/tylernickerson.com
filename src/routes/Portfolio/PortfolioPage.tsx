import React from "react";

import { graphql } from "gatsby";

import styled from "styled-components";

import { Colors, Keyframes, breakpoint } from "@site/util";
import { BackButton } from "@site/components";
import { Helmet } from "react-helmet";

type Props = {
  data: {
    backImage: {
      publicURL: string;
    };
    markdownRemark: {
      frontmatter: {
        title: string;
        sub: string;
        year: string;
        link: string;
      };
      html: string;
    };
  };
  pageContext: {
    portfolio: {
      title: string;
      sub: string;
      html: string;
      link: string;
    };
  };
};

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  color: ${Colors.gray};
  line-height: 1.25em;
  margin: 0;
  padding: 0;

  ${breakpoint.desktop`
    font-size: 3rem;
  `}
`;

const HeaderSub = styled.span`
  font-size: 1.5rem;
  color: ${Colors.gray};
  line-height: 1.75rem;
  opacity: 0.5;
  display: block;
  margin: 0.5rem 0 0;
  padding: 0;

  ${breakpoint.desktop`
    font-size: 1.5rem;
  `}
`;

const Header = styled.header`
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e6e6e6;
`;

const PortfolioPage = styled.div`
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
  padding: 0 2.5rem;
`;

const PortfolioPageContent = styled.div`
  display: flex;
  flex-direction: column;

  ${breakpoint.desktop`
    flex-direction: row;
  `}
`;

const AbstractBody = styled.div`
  padding-top: 1.75rem;
`;

const AbstractText = styled.p`
  font-size: 1rem;
  line-height: 1.75em;

  small {
    line-height: 1.5em;
  }

  h3 {
    color: ${Colors.gray};
    line-height: 2em;
    padding: 0;
    margin: 0 0;
  }

  h6 {
    letter-spacing: 4.5px;
    text-transform: uppercase;
    font-weight: 700;
    color: ${Colors.gray};
    opacity: 0.5;
    display: block;
    margin: 0 0 0.75rem !important;
    padding: 0;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Back = styled(BackButton)`
  margin-bottom: 1.5rem;
`;

const ReadButton = styled.button`
  background: linear-gradient(135deg, ${Colors.teal}, ${Colors.darkTeal});
  width: 100%;
  border-radius: 4px;
  margin-top: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.1rem;
  position: relative;
  border: 0;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
  }

  &:hover,
  &:active,
  &:focus {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);

    &:after {
      opacity: 1;
    }
  }
`;

const PresentationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;

  iframe {
    position: absolute;
    width: 100%;
    border: 1px solid #eee;
    height: 100%;
    left: 0;
    border-radius: 6px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.08), 0 0 48px rgba(0, 0, 0, 0.03);
    top: 0;
  }
`;

const Portfolio: React.FC<Props> = ({ data }) => {
  const markdown = data?.markdownRemark ?? {};
  const frontmatter = markdown?.frontmatter ?? {};

  const { html } = markdown;
  const { title, link, year } = frontmatter;

  return (
    <PortfolioPage>
      <Helmet title={`${title} | Portfolio`} />
      <Back to="/portfolio">Back to Portfolio</Back>
      <PortfolioPageContent>
        <Info>
          <Header>
            <HeaderTitle>{title}</HeaderTitle>
            <HeaderSub>{year}</HeaderSub>
          </Header>
          <AbstractBody>
            <AbstractText dangerouslySetInnerHTML={{ __html: html }} />
          </AbstractBody>
          <PresentationWrapper>
            <iframe src={link} allowFullScreen></iframe>
          </PresentationWrapper>
        </Info>
      </PortfolioPageContent>
    </PortfolioPage>
  );
};

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        year
        sub
        link
      }
    }
  }
`;

export default Portfolio;

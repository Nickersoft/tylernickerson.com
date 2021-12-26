import React, { PureComponent } from "react";

import { GatsbyImage } from "gatsby-plugin-image";
import { get } from "lodash";
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
  };
  pageContext: {
    publication: {
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

const PublicationPage = styled.div`
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
  padding: 0 2.5rem;
`;

const PublicationPageContent = styled.div`
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

const Preview = styled.div`
  display: block;
  width: 100%;
  max-width: 24rem;

  ${breakpoint.desktop`
    margin-left: 3rem;
  `}
`;

const PreviewImageWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
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

class Publication extends PureComponent<Props> {
  goToLink() {
    const link = get(this.props, "data.markdownRemark.frontmatter.link");
    const file = get(
      this.props,
      "data.markdownRemark.frontmatter.file.publicURL"
    );

    window.open(file || link, "_blank");
  }

  render() {
    const md = get(this.props, "data.markdownRemark", {});
    const frontmatter = get(md, "frontmatter", {});
    const thumbnail = get(
      frontmatter,
      "thumbnail.childImageSharp.gatsbyImageData"
    );

    const { html } = md;
    const { title, year, publisher } = frontmatter;

    return (
      <PublicationPage>
        <Helmet title={`${title} | Publications`} />
        <Back to="/publications">Back to Publications</Back>
        <PublicationPageContent>
          <Info>
            <Header>
              <HeaderTitle>{title}</HeaderTitle>
              <HeaderSub>
                {publisher}, {year}
              </HeaderSub>
            </Header>
            <AbstractBody>
              <AbstractText dangerouslySetInnerHTML={{ __html: html }} />
            </AbstractBody>
          </Info>
          <Preview>
            <PreviewImageWrapper>
              <GatsbyImage alt={title} image={thumbnail} />
            </PreviewImageWrapper>
            <ReadButton onClick={this.goToLink.bind(this)}>Read Now</ReadButton>
          </Preview>
        </PublicationPageContent>
      </PublicationPage>
    );
  }
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      headings {
        depth
        value
      }
      frontmatter {
        title
        year
        link
        publisher
        file {
          publicURL
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 800, height: 1040)
          }
        }
      }
    }
  }
`;

export default Publication;

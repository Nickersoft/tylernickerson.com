import React, { PureComponent } from "react"

import { get } from "lodash"
import { graphql } from "gatsby"

import { Helmet } from "react-helmet"
import styled from "styled-components"
import Image from "gatsby-image"

import { Keyframes, breakpoint, Colors } from "@site/util"
import { TextArea, BackButton } from "@site/components"

const PortfolioContainer = styled.div`
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
  animation-fill-mode: both;
  padding: 0 2.5rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
  text-align: center;

  ${breakpoint.desktop`
    text-align: left;
  `}
`

const Year = styled.span`
  margin: 0;
  opacity: 0.5;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5em;
  display: block;
  text-align: center;
  color: ${Colors.gray};

  ${breakpoint.desktop`
    text-align: left;
  `};
`

const Back = styled(BackButton)`
  margin-bottom: 2rem;
`

const Text = styled(TextArea)`
  figcaption {
    color: ${Colors.gray};
    margin-top: 1rem;

    span {
      opacity: 0.75;
      display: block;
      font-style: italic;
    }
  }
`

type PublicationType = {
  frontmatter: {
    title: string
    sub: string
    thumbnail: Image
  }
  html: string
}

type Props = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: PublicationType
      }[]
    }
  }
}

class PortfolioCollection extends PureComponent<Props> {
  render() {
    const fm = get(this.props, "data.markdownRemark.frontmatter")
    const title = get(fm, "title", "")
    const year = get(fm, "year", "")
    const sub = get(fm, "sub", "")
    const html = get(this.props, "data.markdownRemark.html", "")

    return (
      <>
        <Helmet title={`${title} | Portfolio`} />
        <PortfolioContainer>
          <Back to="/portfolio">Back to Portfolio</Back>
          <Header>
            {title}
            <Year>{`${sub} (${year})`}</Year>
          </Header>
          <Text dangerouslySetInnerHTML={{ __html: html }} />
        </PortfolioContainer>
      </>
    )
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        year
        sub
        link
        publisher
        thumbnail {
          publicURL
        }
      }
    }
  }
`

export default PortfolioCollection

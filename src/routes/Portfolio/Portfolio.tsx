import React, { PureComponent } from "react"

import { get, map } from "lodash"
import { Link, graphql } from "gatsby"

import styled from "styled-components"
import Image from "gatsby-image"
import { Helmet } from "react-helmet"

import { Colors, Keyframes, breakpoint } from "@site/util"

const PortfolioPage = styled.div`
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
  padding: 0 2.5rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  text-align: center;

  ${breakpoint.desktop`
    text-align: left;
    margin-bottom: 3rem;
  `}
`

const PortfolioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  justify-items: center;
  align-content: center;
`

const Portfolio = styled(Link)`
  width: 100%;
  cursor: pointer;
  text-align: center;
  display: block;

  max-width: 20rem;
  text-decoration: none;
  /* margin: 0 1rem 1rem; */

  ${breakpoint.desktop`
    width: 16rem;

    &:first-of-type {
      margin-left: 0;
    }
  `}

  &:hover {
    & > div {
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15);
    }

    & > span {
      opacity: 0.9;
    }

    & > div {
      opacity: 0.9;
    }
  }

  & > div {
    transition: all 0.3s ease-in-out;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.12);
  }
`

const ImageWrapper = styled.div`
  overflow: hidden;
`

const PortfolioTitle = styled.span`
  color: ${Colors.gray};
  opacity: 0.75;
  text-align: center;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;
  display: block;
  font-weight: 700;
  width: 100%;
`

const PortfolioYear = styled(PortfolioTitle)`
  opacity: 0.5;
  margin: 0;
  font-weight: 400;
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
  getPortfolioEntry(publication: PublicationType) {
    const thumbnail = get(publication, "thumbnail.childImageSharp.fluid")
    const title = get(publication, "title", "")
    const year = get(publication, "year", "")
    const path = get(publication, "path")

    return (
      <Portfolio key={title} to={path}>
        {thumbnail && (
          <ImageWrapper>
            <Image fluid={thumbnail} />
          </ImageWrapper>
        )}
        <PortfolioTitle>{title}</PortfolioTitle>
        <PortfolioYear>{year}</PortfolioYear>
      </Portfolio>
    )
  }

  render() {
    const edges = get(this.props, "data.allMarkdownRemark.edges", [])
    const entries = map(edges, "node.frontmatter")

    return (
      <>
        <Helmet title="Portfolio | Tyler Nickerson" />
        <PortfolioPage>
          <Header>Portfolio</Header>
          <PortfolioContainer>
            {entries
              .sort(({ year: y1 }, { year: y2 }) =>
                parseInt(y1) > parseInt(y2) ? -1 : 1
              )
              .map(this.getPortfolioEntry)}
          </PortfolioContainer>
        </PortfolioPage>
      </>
    )
  }
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/portfolio/" } }) {
      edges {
        node {
          html
          frontmatter {
            title
            year
            path
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`

export default PortfolioCollection

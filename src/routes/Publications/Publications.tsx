import React, { PureComponent } from "react"

import { get, map } from "lodash"
import { Link, graphql } from "gatsby"

import styled from "styled-components"
import Image from "gatsby-image"
import { Helmet } from "react-helmet"

import { Colors, Keyframes, breakpoint } from "@site/util"

const PublicationsPage = styled.div`
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

const PublicationsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  ${breakpoint.desktop`
    justify-content: flex-start;
  `}
`

const Publication = styled(Link)`
  width: 100%;
  cursor: pointer;
  display: block;
  text-decoration: none;
  margin: 0 0 2rem;

  ${breakpoint.desktop`
    width: calc((100% - (4rem * 3)) / 4);
    margin-left: 4rem;

    &:first-of-type, &:nth-child(5n) {
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

const PublicationTitle = styled.span`
  color: ${Colors.gray};
  opacity: 0.75;
  text-align: center;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;
  display: block;
  font-weight: 700;
  width: 100%;
`

const PublicationYear = styled(PublicationTitle)`
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

class Publications extends PureComponent<Props> {
  getPublicationEntry(publication: PublicationType) {
    const thumbnail = get(publication, "thumbnail.childImageSharp.fluid")
    const title = get(publication, "title", "")
    const year = get(publication, "year", "")
    const path = get(publication, "path")

    return (
      <Publication key={title} to={path}>
        {thumbnail && <Image fluid={thumbnail} />}
        <PublicationTitle>{title}</PublicationTitle>
        <PublicationYear>{year}</PublicationYear>
      </Publication>
    )
  }

  render() {
    const edges = get(this.props, "data.allMarkdownRemark.edges", [])
    const entries = map(edges, "node.frontmatter")
    
    return (
      <PublicationsPage>
        <Helmet title="Publications | Tyler Nickerson" />
        <Header>Publications</Header>
        <PublicationsContainer>
          {entries.sort(({ year:y1 }, {year:y2}) => parseInt(y1)>parseInt(y2) ? -1 : 1 ).map(this.getPublicationEntry)}
        </PublicationsContainer>
      </PublicationsPage>
    )
  }
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/publications/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            year
            path
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 1040) {
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

export default Publications

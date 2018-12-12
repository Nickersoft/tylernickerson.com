import React, { Component } from 'react'

import { graphql } from 'gatsby'
import { map, flow, find, get } from 'lodash/fp'

import styled from 'styled-components'

import ProjectPreview from './HomepageProjectPreview'
import AnimatedHeader from './HomepageAnimatedHeader'
import IconGrid from './HomepageIconGrid'

type Props = {
  location: Location
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        page: string
      }
      html: string
    }
  }
}

const HomepageWrapper = styled.main`
  display: flex;
  height: 30rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

class Homepage extends Component<Props> {
  getProjectPreview(id: string) {
    const data = flow(
      get('data.allMarkdownRemark.edges'),
      map('node'),
      find(['frontmatter.id', id])
    )(this.props)

    const frontmatter = get('frontmatter')(data)
    const title = get('title')(frontmatter)
    const tagline = get('tagline')(frontmatter)
    const duration = get('duration')(frontmatter)
    const website = get('website')(frontmatter)
    const path = get('path')(frontmatter)
    const html = get('html')(data)

    console.log(this.props)

    return (
      <ProjectPreview
        title={title}
        path={path}
        id={id}
        website={website}
        duration={duration}
        tagline={tagline}
        html={html}
      />
    )
  }

  render() {
    const hash = get('hash')(location).substr(1)
    const renderPreview = hash.trim().length > 0

    return (
      <HomepageWrapper>
        {renderPreview ? this.getProjectPreview(hash) : <AnimatedHeader />}
        <IconGrid selectedIcon={hash || ''} />
      </HomepageWrapper>
    )
  }
}

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/preview/" } }) {
      edges {
        node {
          frontmatter {
            title
            id
            website
            duration
            tagline
            path
          }
          html
        }
      }
    }
  }
`

export default Homepage

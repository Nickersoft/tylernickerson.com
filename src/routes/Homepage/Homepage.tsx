import React, { Component } from 'react'

import { StaticQuery, graphql } from 'gatsby'
import { get } from 'lodash'

import styled from 'styled-components'

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
  padding: 3rem 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

class Homepage extends Component<Props> {
  render() {
    console.log(this.props.data)
    return (
      <HomepageWrapper>
        <AnimatedHeader />
        <IconGrid />
      </HomepageWrapper>
    )
  }
}

export default Homepage

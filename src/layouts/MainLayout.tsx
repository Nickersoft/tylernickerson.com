import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { Container } from '@site/components'

import Header from './components/Header'

import './layout.css'

type Props = {
  children: JSX.Element | JSX.Element[]
  location: Location
}

class Layout extends Component<Props> {
  render() {
    const { children, location } = this.props

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header location={location} />
            <Container>{children}</Container>
          </>
        )}
      />
    )
  }
}

export default Layout

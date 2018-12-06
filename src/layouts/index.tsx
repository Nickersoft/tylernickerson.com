import React, { PureComponent } from 'react'

import MainLayout from './MainLayout'
import ProjectLayout from './ProjectLayout'

type Props = {
  children: JSX.Element | JSX.Element[]
  location: Location
  pageContext: {
    layout: string
    project?: {
      key: string
    }
  }
}

export default class Layout extends PureComponent<Props> {
  resolveChildren() {
    const { pageContext, children } = this.props

    switch (pageContext.layout) {
      case 'project':
        return (
          <ProjectLayout pageContext={pageContext}>{children}</ProjectLayout>
        )
      default:
        return children
    }
  }

  render() {
    return (
      <MainLayout location={this.props.location}>
        {this.resolveChildren()}
      </MainLayout>
    )
  }
}

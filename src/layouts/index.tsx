import React, { PureComponent } from "react"

import { get } from "lodash"

import MainLayout from "./MainLayout"
import ItemLayout from "./ItemLayout"

require(`katex/dist/katex.min.css`)

type Props = {
  children: JSX.Element | JSX.Element[]
  location: Location
  pageContext: {
    layout: string
    pathPrefix: string
    data: {
      path: string
      icon: string
    }[]
    itemKey: string
    allKeys: string[]
  }
}

export default class Layout extends PureComponent<Props> {
  resolveChildren() {
    const { pageContext, children, location } = this.props

    const layout = get(pageContext, "layout", "main")
    const data = get(pageContext, "data", [])

    switch (layout) {
      case "items":
        return (
          <ItemLayout location={location} data={data || []}>
            {children}
          </ItemLayout>
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

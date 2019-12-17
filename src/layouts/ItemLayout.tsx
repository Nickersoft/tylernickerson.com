import React, { PureComponent } from "react"

import styled from "styled-components"

import { breakpoint } from "@site/util"

import ItemSideBar from "./components/ItemSideBar"

const ItemPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;

  ${breakpoint.desktop`
    flex-direction: row;
  `}
`

type Props = {
  children: JSX.Element | JSX.Element[]
  location: Location
  data: {
    path: string
    icon: string
  }[]
}

class ItemLayout extends PureComponent<Props> {
  render() {
    const { children, location, data } = this.props

    return (
      <ItemPage>
        <ItemSideBar location={location} data={data} />
        {children}
      </ItemPage>
    )
  }
}

export default ItemLayout

import React, { PureComponent } from "react"

import { Link } from "gatsby"
import { get, findIndex } from "lodash"

import styled from "styled-components"

import { Icon } from "@site/components"
import { breakpoint } from "@site/util"

type SideNavProps = {
  activeIndex: number
}

const SideNav = styled.nav<SideNavProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  border-bottom: 2px solid #e6e6e6;
  padding: 0 2.5rem 2.5rem;
  width: 100%;
  overflow: scroll;
  flex-shrink: 0;

  ${breakpoint.desktop`
    flex-direction: column;
    border-bottom: none;
    border-right: 2px solid #e6e6e6;
    padding: 0;
    padding-right: 2.5rem;
    width: auto;
  `}

  &:after {
    content: "\u25b6";
    color: #bbb;
    font-size: 24px;
    position: absolute;
    transition: all 0.2s ease-in-out;
    left: calc(
      ${({ activeIndex }) => 64 * activeIndex + 18 * activeIndex + 64 / 2}px +
        2.5rem
    );
    bottom: 0.5rem;
    transform: translateX(-50%) rotate(90deg);

    ${breakpoint.desktop`
      transform: translateY(-50%);
      left: auto;
      bottom: auto;
      right: 0.5rem;
      top: ${({ activeIndex }: SideNavProps) =>
        64 * activeIndex + 18 * activeIndex + 64 / 2}px;
    `}
  }
`

const NavIcon = styled(Icon)`
  margin-right: 18px;
  cursor: pointer;

  ${breakpoint.desktop`
    margin: 0;
    margin-bottom: 18px;
  `}
`

type Props = {
  location: Location
  data: {
    path: string
    icon: string
  }[]
}

class ItemSideBar extends PureComponent<Props> {
  getIcon = (activeIconIndex: number) => (data: any, index: number) => {
    const { path } = data

    const active = index === activeIconIndex
    const opacity = active ? 0.75 : 1

    return (
      <Link key={path} to={path} style={{ opacity }}>
        <NavIcon depressed={active} size={64} name={get(data, "icon", "")} />
      </Link>
    )
  }

  private getActiveIconIndex() {
    const {
      data,
      location: { pathname },
    } = this.props

    return findIndex(data, ({ path }) => pathname.includes(path))
  }

  render() {
    const { data } = this.props

    const activeIconIndex = this.getActiveIconIndex()

    return (
      <SideNav activeIndex={activeIconIndex}>
        {data.map(this.getIcon(activeIconIndex))}
      </SideNav>
    )
  }
}

export default ItemSideBar

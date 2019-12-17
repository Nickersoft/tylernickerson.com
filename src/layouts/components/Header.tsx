import React, { Component } from "react"

import { Link as GatsbyLink } from "gatsby"
import { get } from "lodash"

import styled from "styled-components"

import { Link } from "@site/models"
import { Container } from "@site/components"
import { breakpoint, Colors, Keyframes } from "@site/util"

type HeaderListProps = {
  percentage: number
  offset: number
  visible: boolean
}

type HeaderLinkProps = {
  index: number
}

const HeaderLink = styled(GatsbyLink)<HeaderLinkProps>`
  letter-spacing: 4px;
  line-height: 2rem;
  font-size: 1rem;
  color: ${Colors.gray};
  width: 100%;
  height: 100%;
  display: block;
  text-transform: uppercase;
  text-decoration: none;
  animation: ${Keyframes.fadeInUp} 0.2s ease-in-out;
  animation-delay: ${({ index }) => index * 0.2}s;
  animation-fill-mode: both;

  ${breakpoint.desktop`
    animation: none;
    font-size: 0.8rem;
  `}
`

const HeaderItem = styled.li`
  display: inline-block;
  text-align: center;

  ${breakpoint.desktop`
    flex: 1;
  `}
`

const HeaderContainer = styled(Container)`
  padding: 0;

  ${breakpoint.desktop`
    padding: 3rem 0;
  `}
`

const MobileCloseButton = styled.button`
  position: fixed;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 999999;
  border: none;
  background: none;
  outline: none;
  display: block;

  ${breakpoint.desktop`
    display: none;
  `}

  &:after {
    content: "×";
    font-size: 3rem;
    color: ${Colors.gray};
    opacity: 0.3;
  }
`

const MobileOpenButton = styled.button`
  color: ${Colors.gray};
  text-transform: uppercase;
  letter-spacing: 4px;
  display: block;
  padding: 2rem 0;
  font-weight: 700;
  opacity: 0.6;
  border: none;
  display: block;
  width: 100%;
  background: none;
  outline: none;

  &:focus,
  &:active {
    opacity: 1;
  }

  ${breakpoint.desktop`
    display: none;
  `}
`

const HeaderList = styled.ul<HeaderListProps>`
  list-style: none;
  margin: 0;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  position: fixed;
  background: #fbfbfb;
  width: 100%;
  height: 100%;
  z-index: 9999;

  ${breakpoint.desktop`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0;
    transition: all 0.5s ease-in-out;
    width: auto;
    height: auto;

    &:after {
      content: '';
      height: 4px;
      width: ${({ percentage }: HeaderListProps) => percentage * 100}%;
      display: block;
      position: absolute;
      bottom: 0;
      background: ${Colors.blue};
      transition: all 0.25s ease-in-out;
      left: ${({ offset, percentage }: HeaderListProps) =>
        offset * percentage * 100}%;
    }
  `}
`

type Props = {
  location: Location
}

type State = {
  mobileMenuShowing: boolean
  currentLocation: string | null
}

class Header extends Component<Props, State> {
  static defaultProps = {
    siteTitle: "",
  }

  state = {
    mobileMenuShowing: false,
    currentLocation: null,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const pathname = get(props, "location.pathname")

    if (pathname !== state.currentLocation) {
      return {
        mobileMenuShowing: false,
        currentLocation: props.location.pathname,
      }
    }

    return null
  }

  links = [
    Link("Home", ""),
    Link("Experience", "experience"),
    Link("Projects", "projects"),
    Link("Portfolio", "portfolio"),
    Link("Publications", "publications"),
    Link("Contact", "contact"),
  ]

  openMobileMenu() {
    this.setState({
      mobileMenuShowing: true,
    })
  }

  closeMobileMenu() {
    this.setState({
      mobileMenuShowing: false,
    })
  }

  render() {
    const { location } = this.props
    const { mobileMenuShowing } = this.state

    const itemWidth = 1 / Math.max(this.links.length, 1)

    let navMatch = this.links.findIndex(
      ({ location: linkLoc }) =>
        location.pathname.includes(linkLoc.split("/")[0]) &&
        linkLoc.trim().length > 0
    )

    if (navMatch === -1) {
      navMatch = 0
    }

    return (
      <HeaderContainer>
        {mobileMenuShowing ? (
          <MobileCloseButton onClick={this.closeMobileMenu.bind(this)} />
        ) : (
          <MobileOpenButton onClick={this.openMobileMenu.bind(this)}>
            Navigation
          </MobileOpenButton>
        )}

        <HeaderList
          percentage={itemWidth}
          offset={navMatch}
          visible={mobileMenuShowing}
        >
          {this.links.map(({ name, location }, idx) => (
            <HeaderItem key={location}>
              <HeaderLink
                to={`/${location}`}
                index={idx}
                style={{ opacity: idx === navMatch ? 1 : 0.5 }}
              >
                {name}
              </HeaderLink>
            </HeaderItem>
          ))}
        </HeaderList>
      </HeaderContainer>
    )
  }
}

export default Header

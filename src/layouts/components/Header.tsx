import React, { Component } from 'react'

import { Link as GatsbyLink } from 'gatsby'

import styled from 'styled-components'

import { Link } from '@site/models'
import { Container } from '@site/components'
import { Colors } from '@site/util'

type HeaderListProps = {
  percentage: number
  offset: number
}

const HeaderLink = styled(GatsbyLink)`
  letter-spacing: 4px;
  line-height: 1.5rem;
  font-size: 0.8rem;
  color: ${Colors.gray};
  width: 100%;
  height: 100%;
  display: block;
  text-transform: uppercase;
  text-decoration: none;
`

const HeaderItem = styled.li`
  display: inline-block;
  flex: 1;
  text-align: center;
`

const HeaderList = styled.ul<HeaderListProps>`
  list-style: none;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0;
  transition: all 0.5s ease-in-out;

  &:after {
    content: '';
    height: 4px;
    width: ${({ percentage }) => percentage * 100}%;
    display: block;
    position: absolute;
    bottom: 0;
    background: ${Colors.blue};
    transition: all 0.25s ease-in-out;
    left: ${({ offset, percentage }) => offset * percentage * 100}%;
  }
`

type Props = {
  location: Location
}

class Header extends Component<Props> {
  static defaultProps = {
    siteTitle: '',
  }

  links = [
    Link('Home', ''),
    Link('Experience', 'experience'),
    Link('Projects', 'projects/linguistic'),
    Link('Publications', 'publications'),
    Link('Contact', 'contact'),
  ]

  render() {
    const { location } = this.props

    const itemWidth = 1 / Math.max(this.links.length, 1)

    let navMatch = this.links.findIndex(
      ({ location: linkLoc }) =>
        location.pathname.includes(linkLoc.split('/')[0]) &&
        linkLoc.trim().length > 0
    )

    if (navMatch === -1) {
      navMatch = 0
    }

    return (
      <Container>
        <HeaderList percentage={itemWidth} offset={navMatch}>
          {this.links.map(({ name, location }, idx) => (
            <HeaderItem key={location}>
              <HeaderLink
                to={`/${location}`}
                style={{ opacity: idx === navMatch ? 1 : 0.5 }}
              >
                {name}
              </HeaderLink>
            </HeaderItem>
          ))}
        </HeaderList>
      </Container>
    )
  }
}

export default Header

import React, { PureComponent } from "react"

import styled from "styled-components"

import { LinkModel } from "@site/models"
import { Colors, breakpoint, Keyframes } from "@site/util"

const MainContent = styled.div`
  flex: 1;
  padding: 0 2.5rem;
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
  margin-top: 1rem;
  width: 100%;

  ${breakpoint.desktop`
    margin: 0;
  `}
`

const ContentHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.75rem 0;
  border-bottom: 2px solid ${Colors.lightGray};
  /* text-align: center; */

  ${breakpoint.desktop`
    flex-direction: row;
  `}
`

const ContentHeaderLabel = styled.h1`
  font-size: 1rem;
  text-transform: uppercase;
  color: ${Colors.gray};
  opacity: 0.5;
  letter-spacing: 4.5px;
  line-height: 1.2em;
  margin: 0;
  padding: 0;

  ${breakpoint.desktop`
    font-size: 1.125rem;
  `}
`

const ContentHeaderTitle = styled.h2`
  font-size: 2.5rem;
  line-height: 1.25em;
  margin: 0;
  padding: 0;
  color: ${Colors.gray};

  ${breakpoint.desktop`
    font-size: 3rem;
  `}
`

const ContentHeaderYear = styled.span`
  font-size: 1.5rem;
  line-height: 1.5em;
  margin: 0;
  padding: 0;
  color: ${Colors.mediumGray};

  ${breakpoint.desktop`
    font-size: 2rem;
  `}
`

const ContentHeaderNav = styled.nav`
  display: none;

  ${breakpoint.desktop`
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `}
`

const ContentHeaderNavItem = styled.a`
  color: ${Colors.gray};
  opacity: 0.5;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.75;
  }
`

const ContentHeaderText = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;

  ${breakpoint.desktop`
    margin: 0;
    width: auto;
    min-width: 15rem;
    margin-right: 1rem;
  `}
`

type Props = {
  children: React.ReactNode | React.ReactNode[];
  label: string
  header: string
  navItems: LinkModel[]
  subheader: string
}

export class TitledView extends PureComponent<Props> {
  static defaultProps = {
    navItems: [],
  }

  render() {
    const { children, label, header, navItems, subheader } = this.props

    return (
      <MainContent>
        <ContentHeader>
          <ContentHeaderText>
            <ContentHeaderLabel>{label || ""}</ContentHeaderLabel>
            <ContentHeaderTitle>{header || ""}</ContentHeaderTitle>
            <ContentHeaderYear>{subheader || ""}</ContentHeaderYear>
          </ContentHeaderText>
          <ContentHeaderNav>
            {navItems.map(item => (
              <ContentHeaderNavItem key={item.name} href={item.location}>
                {item.name}
              </ContentHeaderNavItem>
            ))}
          </ContentHeaderNav>
        </ContentHeader>
        {children}
      </MainContent>
    )
  }
}

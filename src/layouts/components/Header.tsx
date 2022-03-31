import React, { Component, useState } from "react";

import { Link as GatsbyLink } from "gatsby";
import { get } from "lodash";

import tw, { styled } from "twin.macro";

import { Link } from "@site/models";
import { Container } from "@site/components";
import { breakpoint, Colors, Keyframes } from "@site/util";

type HeaderListProps = {
  percentage: number;
  offset: number;
  visible: boolean;
};

type HeaderLinkProps = {
  index: number;
};

const HeaderLink = styled(GatsbyLink)<HeaderLinkProps>`
  ${tw`leading-normal text-base`};

  color: ${Colors.gray};
  width: 100%;
  height: 100%;
  display: block;
  text-decoration: none;
  animation: ${Keyframes.fadeInUp} 0.2s ease-in-out;
  animation-delay: ${({ index }) => index * 0.2}s;
  animation-fill-mode: both;

  ${breakpoint.desktop`
    animation: none;
    margin: 0;
    padding: 1rem 0;
  `}
`;

const HeaderItem = styled.li`
  display: inline-block;
  text-align: center;
  margin: 0;

  ${breakpoint.desktop`
    flex: 1;
  `}
`;

const HeaderContainer = styled(Container)`
  padding: 0;

  ${breakpoint.desktop`
    padding: 2rem 0 3rem;
    width: 95%;
  `}
`;

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
`;

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
`;

const HeaderList = styled.ul<HeaderListProps>`
  ${tw`list-none p-0 m-0 bg-offWhite z-[9999]`}
  ${tw`transition-all ease-in-out duration-500`};
  ${tw`w-full h-full lg:(w-auto h-auto)`};
  ${tw`fixed lg:relative`};
  ${tw`flex-col justify-center lg:flex-row lg:flex!`};
  ${tw`after:hidden lg:after:block`}
  ${({ visible }) => (visible ? tw`flex` : tw`hidden`)};

  &:after {
    content: "";
    height: 4px;
    width: ${({ percentage }: HeaderListProps) => percentage * 100}%;
    position: absolute;
    bottom: 0;
    background: ${Colors.blue};
    transition: all 0.25s ease-in-out;
    left: ${({ offset, percentage }: HeaderListProps) =>
      offset * percentage * 100}%;
  }
`;

type Props = {
  location: Location;
};

const Header: React.FC<Props> = ({ location }) => {
  const [mobileMenuShowing, setMobileMenuShowing] = useState(false);

  const currentLocation = location?.pathname ?? null;

  const links = [
    Link("Home", ""),
    Link("Experience", "experience"),
    Link("Projects", "projects"),
    Link("Portfolio", "portfolio"),
    Link("Publications", "publications"),
    Link("Contact", "contact"),
  ];

  const itemWidth = 1 / Math.max(links.length, 1);

  let navMatch = Math.max(
    0,
    links.findIndex(
      ({ location: linkLoc }) =>
        currentLocation.includes(linkLoc.split("/")[0]) &&
        linkLoc.trim().length > 0
    )
  );

  return (
    <Container tw="lg:(pt-8 px-0 pb-12 w-[95%]) p-0">
      {mobileMenuShowing ? (
        <MobileCloseButton onClick={() => setMobileMenuShowing(false)} />
      ) : (
        <MobileOpenButton onClick={() => setMobileMenuShowing(true)}>
          Navigation
        </MobileOpenButton>
      )}

      <HeaderList
        percentage={itemWidth}
        offset={navMatch}
        visible={mobileMenuShowing}
      >
        {links.map(({ name, location }, idx) => (
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
    </Container>
  );
};

export default Header;

import React, { Component } from "react"

import { Link } from "gatsby"

import styled, { css, keyframes } from "styled-components"

import { Colors, Brands, Keyframes } from "@site/util"
import { BackButton } from "@site/components"

const ANIM_BASE_DURATION = 0.2

type ColorProps = {
  accentColors: string[]
}

type AnimationProps = {
  animationIndex: number
}

const accentAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100px;
  }
`

const Preview = styled.div`
  max-width: 35rem;
`

const Back = styled(BackButton)<AnimationProps>`
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  animation-fill-mode: both;
`

const Header = styled.header<ColorProps & AnimationProps>`
  padding: 1.75rem 0;
  margin: 0;
  position: relative;

  &:after {
    content: "";
    display: block;
    animation: ${accentAnimation} 0.5s ease-in-out;
    animation-fill-mode: both;
    animation-delay: ${({ animationIndex }) =>
      animationIndex * ANIM_BASE_DURATION}s;
    height: 6px;
    background: ${({ accentColors }) => accentColors[1]};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const HeaderTitle = styled.h1<AnimationProps>`
  font-size: 3rem;
  color: ${Colors.gray};
  margin: 0;
  line-height: 1.15em;
  padding: 0;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  animation-fill-mode: both;
`

const HeaderSub = styled.h2<AnimationProps>`
  font-size: 1.75rem;
  font-weight: 400;
  color: ${Colors.gray};
  opacity: 0.5;
  padding: 0;
  margin: 0;
  line-height: 1.15em;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  animation-fill-mode: both;
`

const Description = styled.div<AnimationProps>`
  padding: 2rem 0 0;
  font-size: 1.125rem;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  line-height: 1.5em;
  color: ${Colors.gray};
`

const Overview = styled.div<AnimationProps>`
  line-height: 1.5em;
  color: ${Colors.gray};
  margin-bottom: 2rem;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  animation-fill-mode: both;

  a {
    color: ${Colors.gray};
    text-decoration: none;

    &:focus,
    &:active,
    &:hover {
      color: ${Colors.blue};
    }
  }

  span {
    font-weight: 700;
    color: #777;
  }
`

const Button = styled(Link)<ColorProps & AnimationProps>`
  border-radius: 4px;
  display: inline-block;
  overflow: hidden;
  padding: 0.6rem 3rem 0.6rem 2rem;
  background: ${({ accentColors }) =>
    css`linear-gradient(135deg, ${accentColors[0]}, ${accentColors[1]})`};
  color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  text-decoration: none;
  border: none;
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  line-height: 1.75rem;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-delay: ${({ animationIndex }) =>
    animationIndex * ANIM_BASE_DURATION}s;
  animation-fill-mode: both;
  font-size: 1rem;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

    &:after {
      opacity: 1;
    }
  }

  &:before {
    content: "▶";
    position: absolute;
    right: 1.5rem;
    top: 50%;
    line-height: 1.5rem;
    transform: translateY(-45%);
  }

  &:after {
    content: "";
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    top: 0;
    left: 0;
    opacity: 0;
  }
`

type Props = {
  title: string
  duration: string
  website: string
  tagline: string
  link: string
  html: string
  id: string
}

class HomepageProjectPreview extends Component<Props> {
  render() {
    const { title, duration, website, id, tagline, link, html } = this.props

    const brandColors = Brands[id]

    return (
      <Preview>
        <Back animationIndex={0} to="/">
          Back to Home
        </Back>
        <Header animationIndex={3} accentColors={brandColors}>
          <HeaderTitle animationIndex={1}>{title}</HeaderTitle>
          <HeaderSub animationIndex={2}>{tagline}</HeaderSub>
        </Header>
        <Description
          animationIndex={4}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Overview animationIndex={5}>
          <span>Duration: </span> {duration}
          <br />
          <span>Website: </span>{" "}
          <a href={website} target="_blank">
            {website}
          </a>
        </Overview>
        <Button animationIndex={6} accentColors={brandColors} to={link}>
          Learn More
        </Button>
      </Preview>
    )
  }
}

export default HomepageProjectPreview

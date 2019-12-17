import React, { Component } from "react"

import styled, { css, keyframes } from "styled-components"

import { Colors, breakpoint, Keyframes } from "@site/util"
import { graphql, StaticQuery } from "gatsby"

type FadeState = "in" | "out" | "none"

type State = {
  fadeState: FadeState
  currentTitleIndex: number
}

const Header = styled.h1`
  text-align: center;
  color: ${Colors.gray};
  transition: all 0.5s ease-in-out;
  line-height: 1.15em;

  ${breakpoint.desktop`
    text-align: left;
  `}
`

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  in {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-6px);
  }
`

type AnimatedTextState = {
  fadeState: FadeState
  color: string
}

const AnimatedTextContainer = styled.span`
  display: inline-block;
  width: 11.25rem;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 0;
    /* border-bottom: 3px dashed ${Colors.gray}; */
    position: absolute;
    bottom: 3px;
    left: 0;
    z-index: -1;
    opacity: 0.2;
  }
`

const AnimatedText = styled.span<AnimatedTextState>`
  display: inline-block;
  color: ${({ color }) => color};
  transition: all 0.5s ease-in-out;
  text-align: center;
  position: relative;
  width: 100%;

  ${({ fadeState }) => {
    if (fadeState !== "none") {
      return css`
        animation: ${fadeState === "in" ? fadeInAnimation : fadeOutAnimation}
          0.5s ease-in-out forwards;
      `
    }

    return ""
  }};
`

const Container = styled.div`
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
`

const ResumeLink = styled.p`
  display: block;
  color: #777;
  text-align: center;
  padding: 0 2rem;

  a {
    color: #555;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${Colors.blue};
    }
  }

  ${breakpoint.desktop`
    padding: 0;
    text-align: left;
  `}
`

type Title = {
  text: string
  color: string
}

const titles: Title[] = [
  {
    text: "designer",
    color: Colors.blue,
  },
  {
    text: "developer",
    color: Colors.red,
  },
  {
    text: "dreamer",
    color: Colors.green,
  },
  {
    text: "builder",
    color: Colors.orange,
  },
  {
    text: "raconteur",
    color: Colors.teal,
  },
  {
    text: "creator",
    color: Colors.purple,
  },
]

type Props = {}

class HomepageAnimatedHeader extends Component<Props, State> {
  state = {
    fadeState: "none" as "none",
    currentTitleIndex: 0,
  }

  repeatedInterval: any

  componentDidMount() {
    this.repeatedInterval = setInterval(() => {
      const { currentTitleIndex } = this.state
      const nextIndex =
        currentTitleIndex === titles.length - 1 ? 0 : currentTitleIndex + 1
      this.setState({
        fadeState: "out",
      })
      setTimeout(() => {
        this.setState({
          fadeState: "in",
          currentTitleIndex: nextIndex,
        })
      }, 600)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.repeatedInterval)
  }

  render() {
    const { fadeState, currentTitleIndex } = this.state

    const { color: currentTitleColor, text: currentTitleText } = titles[
      currentTitleIndex
    ]

    return (
      <StaticQuery
        query={graphql`
          query {
            resume: file(relativePath: { eq: "resume.pdf" }) {
              publicURL
            }
          }
        `}
        render={({ resume: { publicURL: resumeLink } }) => (
          <Container>
            <Header>
              Hi. I'm Tyler.
              <br />
              I'm a{" "}
              <AnimatedTextContainer>
                <AnimatedText fadeState={fadeState} color={currentTitleColor}>
                  {currentTitleText}
                </AnimatedText>
              </AnimatedTextContainer>{" "}
              in Silicon Valley.
            </Header>
            <ResumeLink>
              Don't have time to browse? Feel free to{" "}
              <a target="_blank" href={resumeLink}>
                download my resume
              </a>{" "}
              instead.
            </ResumeLink>
          </Container>
        )}
      />
    )
  }
}

export default HomepageAnimatedHeader

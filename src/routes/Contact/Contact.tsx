import React, { Component } from "react"

import { graphql } from "gatsby"
import { get } from "lodash"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faGithub,
  faDribbble,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"

import { Helmet } from "react-helmet"
import Image, { GatsbyImageProps } from "gatsby-image"
import styled from "styled-components"

import { Keyframes, Colors, breakpoint } from "@site/util"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

type AnimationProps = {
  index: number
}

const ContactPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  ${breakpoint.tablet`
    padding: 0;
  `}
`

const InventionsImage = styled(Image)<GatsbyImageProps>`
  max-width: 25rem;
  width: 100%;
  border-radius: 4px;
  box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.1);
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-fill-mode: both;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 400px;
  width: 100%;
  justify-content: space-between;
  padding: 2rem 0;
`

const IconLink = styled.a<AnimationProps>`
  text-decoration: none;
  color: #777;
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-fill-mode: backwards;
  animation-delay: ${({ index }) => 0.2 + index * 0.2}s;

  &:hover {
    color: ${Colors.blue};
    transform: translateY(-4px);
  }
`

const EmailText = styled.p<AnimationProps>`
  color: #777;
  animation: ${Keyframes.fadeInUp} 0.5s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${({ index }) => 0.2 + index * 0.2}s;

  a {
    color: #555;
    transition: color 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
      color: ${Colors.blue};
    }
  }
`

type FAIcon = {
  icon: IconProp
  link: string
}

const Icon = (icon: IconProp, link: string) => ({ link, icon })

const getIcon = ({ icon, link }: FAIcon, idx: number) => (
  <IconLink key={idx} index={idx} href={link} target="_blank">
    <FontAwesomeIcon icon={icon} />
  </IconLink>
)

class Contact extends Component {
  contactIcons = [
    Icon(faTwitter, "https://twitter.com/tylernickerson"),
    Icon(faDribbble, "https://dribbble.com/tylernickerson"),
    Icon(faGithub, "https://github.com/Nickersoft"),
    Icon(faLinkedinIn, "https://www.linkedin.com/in/tylernickerson/"),
  ]

  render() {
    const inventions = get(this.props, "data.file.childImageSharp.fluid", null)

    return (
      <ContactPage>
        <Helmet title="Contact | Tyler Nickerson" />
        {inventions && <InventionsImage fluid={inventions} />}
        <IconContainer>{this.contactIcons.map(getIcon)}</IconContainer>
        <EmailText index={this.contactIcons.length - 1}>
          Or just <a href="mailto:nickersoft@gmail.com">email me</a>
        </EmailText>
      </ContactPage>
    )
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "pics/inventions.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 600) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
  }
`

export default Contact

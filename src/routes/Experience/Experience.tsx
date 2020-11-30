import React from "react"
import styled from "styled-components"

import { filter } from "lodash"
import { PageProps, graphql } from "gatsby"

import { Helmet } from "react-helmet"

import GithubSlugger from "github-slugger"

import { TextArea, Testimonial, TitledView } from "@site/components"
import { Brands, breakpoint, Colors, renderAst } from "@site/util"
import { Heading } from "@site/models"
import ExperienceTestimonials from "./ExperienceTestimonials"

const slugger = new GithubSlugger()

type Markdown = {
  markdownRemark: {
    frontmatter: {
      title: string
      years: string
      position: string
      icon: string
      testimonials: {
        name: string
        title: string
        image: string
        text: string
      }[]
    }
    headings: Heading[]
    htmlAst: object
  }
}

const TestimonialsContainer = styled.div`
  overflow-y: scroll;
  width: calc(100% + 2rem);
  padding: 2.5rem;
  margin: 0 -2.5rem;
  position: relative;
`
const TestimonialOverlay = styled.div`
  position: relative;
  overflow: visible;
  display: block;

  &:before {
    position: absolute;
    content: "";
    width: 2.5rem;
    height: 100%;
    display: block;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), #fbfbfb);
    right: 0;
    top: 0;
    z-index: 100;
  }
`

const Testimonials = styled.div<{ justifyContent: string }>`
  display: flex;
  flex-direction: row;
  justify-content: start;
  position: relative;

  ${breakpoint.tablet`
    justify-content: ${({ justifyContent }: { justifyContent: string }) =>
      justifyContent};
  `}
`

const TestimonialsHeader = styled.div`
  text-align: center;
  position: relative;
  margin: 0 auto;

  span {
    position: relative;
    background: #fbfbfb;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.7rem;
    letter-spacing: 2px;
    padding: 0 1rem;
    color: ${Colors.mediumGray};
    z-index: 10;
  }

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    background: ${Colors.lightGray};
    position: absolute;
  }
`

const Experience: React.FunctionComponent<PageProps<Markdown>> = ({ data }) => {
  const { headings, htmlAst: ast, frontmatter } = data?.markdownRemark ?? {}

  const { title, icon, years, testimonials, position } = frontmatter ?? {
    title: "",
    years: "",
    position: "",
    icon: "",
    testimonials: [],
  }

  slugger.reset()

  const appropHeaders: Heading[] = filter(headings, { depth: 3 })
  const headerLinks = appropHeaders.map(({ value }) => ({
    name: value,
    location: `#${slugger.slug(value)}`,
  }))

  return (
    <>
      <Helmet title={`${title} | Experience`} />
      <TitledView
        header={title}
        navItems={headerLinks}
        subheader={`${position} (${years})`}
        label="Experience"
      >
        <TextArea
          dangerouslySetInnerHTML={{ __html: ast ? renderAst(ast) : "" }}
        />
        {testimonials?.length > 0 && (
          <ExperienceTestimonials
            testimonials={testimonials.map((t) => ({
              ...t,
              color: Brands?.[icon]?.[1] ?? Colors.blue,
            }))}
          />
        )}
      </TitledView>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      headings {
        depth
        value
      }
      frontmatter {
        title
        years
        icon
        position
        testimonials {
          name
          title
          image
          text
        }
      }
    }
  }
`

export default Experience

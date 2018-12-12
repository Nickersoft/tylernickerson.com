import React, { PureComponent } from 'react'

import { get, filter, map } from 'lodash'
import { graphql } from 'gatsby'

import GithubSlugger from 'github-slugger'
import styled from 'styled-components'

import { TitledView } from '@site/components'
import { Colors, renderAst, breakpoint } from '@site/util'
import { Heading } from '@site/models'

const slugger = GithubSlugger()

const ContentBody = styled.div`
  padding: 1.5rem 0;
  color: ${Colors.gray};

  h3 {
    color: ${Colors.gray};
    margin: 0 0 1rem;
  }

  p {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.5em;
  }
`

const ContentOverview = styled.div`
  background: #f6f6f6;
  width: 100%;
  border-radius: 6px;
  margin-top: 1.5rem;
  padding: 1.75rem;

  ${breakpoint.tablet`
    float: right;
    max-width: 20rem;
    margin: 1.5rem 0 1.5rem 1.5rem;
  `}

  h2 {
    font-size: 0.875rem;
    letter-spacing: 3.5px;
    color: ${Colors.gray};
    opacity: 0.5;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: ${Colors.gray};
    transition: color 0.3s ease-in-out;

    &:active,
    &:focus {
      color: ${Colors.gray};
    }

    &:hover {
      color: ${Colors.blue};
    }
  }
`

const ContentOverviewList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const ContentOverviewListItem = styled.li`
  padding: 0;
  color: ${Colors.gray};
  margin: 0;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const ContentOverviewListItemLabel = styled.span`
  display: block;
  font-weight: 700;
  line-height: 1.25em;
  color: #777;
`

type Props = {
  title: string
  sub: string
  html: string
  data: {
    markdownRemark: {
      headings: Heading[]
    }
  }
}

type OverviewInfo = {
  label: string
}

class ProjectsContent extends PureComponent<Props> {
  overviewProps: { [key: string]: OverviewInfo } = {
    stack: {
      label: 'Built With',
    },
    website: {
      label: 'Website',
    },
    duration: {
      label: 'Duration',
    },
    tagline: {
      label: 'Tagline',
    },
    status: {
      label: 'Status',
    },
  }

  render() {
    const md = get(this.props, 'data.markdownRemark', {})
    const ast = get(md, 'htmlAst')
    const frontmatter = get(md, 'frontmatter', {})

    const { title, sub, ...overview } = frontmatter

    slugger.reset()

    // These have to be on separate lines otherwise TS breaks *shrug emoji*
    const headings: Heading[] = get(md, 'headings', [])
    const appropHeaders: Heading[] = filter(headings, { depth: 3 })
    const headerLinks = appropHeaders.map(({ value }) => ({
      name: value,
      location: `#${slugger.slug(value)}`,
    }))

    return (
      <TitledView
        header={title}
        subheader={sub}
        navItems={headerLinks}
        label="Projects"
      >
        <ContentOverview>
          <h2>Quick Facts</h2>
          <ContentOverviewList>
            {map(overview, (value, key) => (
              <ContentOverviewListItem key={key}>
                <ContentOverviewListItemLabel>
                  {get(this.overviewProps, `${key}.label`, '')}
                </ContentOverviewListItemLabel>
                {key === 'website' ? (
                  <a href={value} target="_blank">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </ContentOverviewListItem>
            ))}
          </ContentOverviewList>
        </ContentOverview>
        <ContentBody
          dangerouslySetInnerHTML={{ __html: ast ? renderAst(ast) : '' }}
        />
      </TitledView>
    )
  }
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      headings {
        depth
        value
      }
      frontmatter {
        title
        sub
        duration
        tagline
        website
        stack
      }
    }
  }
`

export default ProjectsContent

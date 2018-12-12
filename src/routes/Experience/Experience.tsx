import React, { PureComponent } from 'react'

import { get, filter } from 'lodash'
import { graphql } from 'gatsby'

import GithubSlugger from 'github-slugger'

import { TextArea, TitledView } from '@site/components'
import { renderAst } from '@site/util'
import { Heading } from '@site/models'

const slugger = new GithubSlugger()

type Props = {
  title: string
  sub: string
  html: string
}

class Experience extends PureComponent<Props> {
  render() {
    const md = get(this.props, 'data.markdownRemark', {})
    const ast = get(md, 'htmlAst')
    const frontmatter = get(md, 'frontmatter', {})

    const { title, years, position } = frontmatter

    slugger.reset()

    const headings: Heading[] = get(md, 'headings', [])
    const appropHeaders: Heading[] = filter(headings, { depth: 3 })
    const headerLinks = appropHeaders.map(({ value }) => ({
      name: value,
      location: `#${slugger.slug(value)}`,
    }))

    return (
      <TitledView
        header={title}
        navItems={headerLinks}
        subheader={`${position} (${years})`}
        label="Experience"
      >
        <TextArea
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
        years
        position
      }
    }
  }
`

export default Experience

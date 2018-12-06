const fs = require('fs')
const path = require('path')
const _ = require('lodash')

function createPublicationRoutes(createPage, graphql) {
  const template = path.resolve(`src/routes/Publications/Publication.tsx`)

  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/publications/" } }
      ) {
        edges {
          node {
            html
            headings {
              depth
              value
            }
            frontmatter {
              title
              year
              link
              publisher
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 800, maxHeight: 1040) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        Promise.reject(result.errors)
      }

      result.data.allMarkdownRemark.edges.map(({ node }) => {
        const { frontmatter, html } = node
        const {
          title,
          thumbnail: {
            childImageSharp: { fluid: thumbnail },
          },
        } = frontmatter

        const slug = title.toLowerCase().replace(/\W+/g, '-')

        createPage({
          path: `/publications/${slug}`,
          component: template,
          context: {
            layout: 'main',
            publication: {
              ...frontmatter,
              html,
              thumbnail,
            },
          },
        })
      })
    })
    .catch(console.error)
}

function createProjectRoutes(createPage, graphql) {
  const template = path.resolve(`src/routes/Projects/Projects.tsx`)

  return graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/projects/" } }) {
        edges {
          node {
            html
            headings {
              depth
              value
            }
            frontmatter {
              title
              key
              years
              duration
              tagline
              website
              stack
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { frontmatter, html } = node
      const { key } = frontmatter

      createPage({
        path: `/projects/${key}`,
        component: template,
        context: {
          layout: 'project',
          project: {
            ...frontmatter,
            html,
          },
        },
      })
    })
  })
}

function createBaseRoutes(createPage) {
  return new Promise(resolve => {
    const pagesDir = path.resolve(__dirname, 'src/routes')
    const directories = fs
      .readdirSync(pagesDir)
      .filter(dir => fs.lstatSync(path.join(pagesDir, dir)).isDirectory())

    directories.forEach(directory => {
      const baseName = path.basename(directory)
      const template = path.join(pagesDir, directory, `${directory}.tsx`)
      const url =
        baseName.toLowerCase() === 'homepage' ? '/' : _.kebabCase(baseName)

      createPage({
        path: url,
        component: template,
        context: {
          layout: 'main',
          customPage: true,
        },
      })
    })

    resolve()
  })
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  Promise.all([
    createBaseRoutes(createPage),
    createProjectRoutes(createPage, graphql),
    createPublicationRoutes(createPage, graphql),
  ])
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@site/models': path.resolve(__dirname, 'src/models'),
        '@site/components': path.resolve(__dirname, 'src/components'),
        '@site/util': path.resolve(__dirname, 'src/util'),
      },
    },
  })
}

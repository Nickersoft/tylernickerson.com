const fs = require("fs")
const path = require("path")
const _ = require("lodash")

function createPortfolioRoutes({ createPage }, graphql) {
  const template = path.resolve(`src/routes/Portfolio/PortfolioPage.tsx`)

  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/portfolio/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
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

      return Promise.all(
        result.data.allMarkdownRemark.edges.map(({ node }) => {
          const { frontmatter } = node
          const { path } = frontmatter

          return createPage({
            path,
            component: template,
            context: {
              layout: "main",
            },
          })
        })
      )
    })
    .catch(console.error)
}

function createPublicationRoutes({ createPage }, graphql) {
  const template = path.resolve(`src/routes/Publications/Publication.tsx`)

  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/publications/" } }
      ) {
        edges {
          node {
            frontmatter {
              sub
              path
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

      return Promise.all(
        result.data.allMarkdownRemark.edges.map(({ node }) => {
          const { frontmatter } = node
          const { path } = frontmatter

          return createPage({
            path,
            component: template,
            context: {
              layout: "main",
            },
          })
        })
      )
    })
    .catch(console.error)
}

function createExperienceRoutes({ createPage, createRedirect }, graphql) {
  const template = path.resolve(`src/routes/Experience/Experience.tsx`)

  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/experience/" } }
      ) {
        edges {
          node {
            frontmatter {
              path
              years
              icon
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const allMatter = _.reverse(
      _.sortBy(_.map(result.data.allMarkdownRemark.edges, "node.frontmatter"), [
        "years",
        "title",
      ])
    )

    createRedirect({
      fromPath: `/experience`,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: _.get(allMatter, "[0].path", ""),
    })

    return Promise.all(
      allMatter.map(({ path }) =>
        createPage({
          path,
          component: template,
          context: {
            data: allMatter,
            layout: "items",
          },
        })
      )
    )
  })
}

function createProjectRoutes({ createPage, createRedirect }, graphql) {
  const template = path.resolve(`src/routes/Projects/Projects.tsx`)

  return graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/projects/" } }) {
        edges {
          node {
            headings {
              depth
              value
            }
            frontmatter {
              path
              icon
              sub
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const allMatter = _.reverse(
      _.sortBy(_.map(result.data.allMarkdownRemark.edges, "node.frontmatter"), [
        "sub",
        "title",
      ])
    )

    createRedirect({
      fromPath: `/projects`,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: _.get(allMatter, "[0].path", ""),
    })

    return Promise.all(
      allMatter.map(({ path }) =>
        createPage({
          path,
          component: template,
          context: {
            data: allMatter,
            layout: "items",
          },
        })
      )
    )
  })
}

function createBaseRoutes({ createPage }) {
  const pagesDir = path.resolve(__dirname, "src/routes")
  const directories = fs
    .readdirSync(pagesDir)
    .filter(dir => fs.lstatSync(path.join(pagesDir, dir)).isDirectory())

  return Promise.all(
    directories.map(directory => {
      const baseName = path.basename(directory)
      const template = path.join(pagesDir, directory, `${directory}.tsx`)
      const url =
        baseName.toLowerCase() === "homepage" ? "/" : _.kebabCase(baseName)

      if (!["experience", "projects"].includes(directory.toLowerCase())) {
        return createPage({
          path: url,
          component: template,
          context: {
            layout: "main",
          },
        })
      }

      return Promise.resolve()
    })
  )
}

exports.createPages = ({ graphql, actions }) =>
  Promise.all([
    createBaseRoutes(actions),
    createProjectRoutes(actions, graphql),
    createPublicationRoutes(actions, graphql),
    createExperienceRoutes(actions, graphql),
    createPortfolioRoutes(actions, graphql),
  ])

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@site/models": path.resolve(__dirname, "src/models"),
        "@site/components": path.resolve(__dirname, "src/components"),
        "@site/util": path.resolve(__dirname, "src/util"),
      },
    },
  })
}

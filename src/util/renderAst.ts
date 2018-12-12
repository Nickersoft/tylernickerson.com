import html from 'rehype-stringify'
import slug from 'rehype-slug'
import unified from 'unified'

export function renderAst(ast: any) {
  const transformed = unified()
    .use(slug)
    .runSync(ast)

  return String(
    unified()
      .use(html)
      .stringify(transformed)
  )
}

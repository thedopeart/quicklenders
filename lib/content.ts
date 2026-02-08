import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/financial-insights')

export interface ArticleMeta {
  title: string
  description: string
  date: string
  slug: string
  keywords?: string[]
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const file = fs.readFileSync(path.join(contentDir, filename), 'utf8')
      const { data } = matter(file)
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        slug: filename.replace('.mdx', ''),
        keywords: data.keywords,
      } as ArticleMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticle(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const file = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(file)

  return {
    content,
    meta: {
      title: data.title,
      description: data.description,
      date: data.date,
      slug,
      keywords: data.keywords,
    } as ArticleMeta,
  }
}

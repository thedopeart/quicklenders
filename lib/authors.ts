export interface Author {
  name: string
  role: string
  bio: string
  slug: string
}

export const authors: Record<string, Author> = {
  'editorial-team': {
    name: 'Quick Lenders Editorial Team',
    role: 'Business Lending Specialists',
    bio: 'Our editorial team brings over a decade of experience in business lending, having helped thousands of small business owners navigate financing options from SBA loans to alternative funding.',
    slug: 'editorial-team',
  },
}

// Default author for all articles
export const defaultAuthor = authors['editorial-team']

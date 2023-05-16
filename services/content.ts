
import type { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { contentful } from '@/clients/contentful'
import { GetStaticPropsContext } from 'next'


export interface NavigationLink {
  label: string
  path: string
  external?: boolean
  // emphasize: boolean
  // subLinks: Entry<NavigationLink>[]
  // photo?: Asset
}

export interface Navigation {
  title: string
  id: string
  links: Entry<NavigationLink>[]
}

export interface Index {
  title: string
  items: Entry<Page>[]
}

export interface Text {
  title: string
  layout: string
  color: string
  body: Document
  media: Asset
  buttons: Entry<NavigationLink>[]
}

export interface Form {
  title: string
  top: Document
  bottom: Document
  media: Asset
}

export interface Cards {
  title: string
  layout: string
  cards: Entry<Text>[]
}

export interface Gallery {
  title: string
  medias: Asset[]
}

export interface Page {
  title: string
  id: string
  description: string
  color: string
  banner: Asset
  content: Entry<Index & Text & Cards & Gallery & Team & Articles & Jobs & Form>[]
}

// export interface ArticleCategory {
//   titre: string
//   id: string
//   description: string
//   photo: Asset
// }

export interface Tag {
  label: string
  id: string
  color: string
}

export interface Member {
  name: string
  jobTitle: string
  id: string
  tag: Entry<Tag>
  introduction: Document
  media: Asset
}

export interface Person {
  name: string
  jobTitle: string
  link: string
}

export interface Team {
  title: string
  members: Entry<Member>[]
}

export interface Article {
  title: string
  id: string
  tags: Entry<Tag>[]
  excerpt: string
  publishedAt: string
  text: Document
  media: Asset
  collaborators: Entry<Person>[]
}

export interface Articles {
  title: string
  layout: string
  articlesTag: Entry<Tag>
}

export interface Office {
  city: string
  initials: string
  country: string
  link: string
}

export interface Job {
  title: string
  id: string
  department: Entry<Tag>
  office: Entry<Office>
  excerpt: string
  publishedAt: string
  text: Document
}

export interface Jobs {
  title: string
  jobs: Entry<Job>
}

const limit = 42

export const ContentService = {
  navigation: async (id: string, locale: string=undefined) => {
    const [navs] = await Promise.all([
      contentful.getEntries<Navigation>({ content_type: 'navigation', locale, include: 2, 'fields.id': id }),
      // contentful.getEntries<NavigationLink>({ content_type: 'navigationLink', locale, include: 2 })
    ])
    return navs.items[0]
  },
  page: async (id: string, locale: string=undefined) => {
    const pages = await contentful.getEntries<Page>({ content_type: 'page', locale, include: 4,
      'fields.id': id })
    return pages.items[0]
  },
  member: async (id: string, locale: string=undefined) => {
    const pages = await contentful.getEntries<Member>({ content_type: 'teamMember', locale, include: 2,
      'fields.id': id })
    return pages.items[0]
  },
  article: async (id: string, locale: string=undefined) => {
    const tags = await contentful.getEntries<Tag>({ content_type: 'tag', locale, include: 2 })
    const articles = (await contentful.getEntries<Article>({ content_type: 'article', locale, include: 2,
      'fields.id': id }))
    return {
      ...articles.items[0],
      fields: {
        ...articles.items[0].fields,
        tags: articles.items[0].fields.tags.map(tag => tags.items.find(t => t.fields.id === tag as any as string)).filter(t => t)
      }
    }
  },
  articles: async (tag: string, page: number, sort?: string, locale?: string, limitOverride?: number) => {
    const tags = await contentful.getEntries<Tag>({ content_type: 'tag', locale, include: 2 })
    const articles = await contentful.getEntries<Article>({ content_type: 'article', locale, include: 3,
      'fields.tags': tag,
      'fields.publishedAt[lte]': new Date().toISOString(),
      limit: (limitOverride || limit),
      skip: page ? page * (limitOverride || limit) : 0,
      order: {
        'newest': '-fields.publishedAt',
        'oldest': 'fields.publishedAt'
      }[sort as string || 'newest'] })
    return {
      ...articles,
      items: articles.items.map(article => ({
        ...article,
        fields: {
          ...article.fields,
          tags: article.fields.tags.map(tag => tags.items.find(t => t.fields.id === tag as any as string)).filter(t => t)
        }
      }))
    }
  },
  offices: async (page: number, sort?: string, locale?: string, limitOverride?: number) => {
    const offices = await contentful.getEntries<Office>({ content_type: 'office', locale, include: 3,
      limit: (limitOverride || limit),
      skip: page ? page * (limitOverride || limit) : 0,
      order: '-fields.city' })
    return offices
  },
  jobs: async (page: number, sort?: string, locale?: string, limitOverride?: number) => {
    const jobs = await contentful.getEntries<Job>({ content_type: 'job', locale, include: 3,
      // 'fields.tags': tag,
      'fields.publishedAt[lte]': new Date().toISOString(),
      limit: (limitOverride || limit),
      skip: page ? page * (limitOverride || limit) : 0,
      order: {
        'newest': '-fields.publishedAt',
        'oldest': 'fields.publishedAt'
      }[sort as string || 'newest'] })
    return jobs
  },
  job: async (id: string, locale: string=undefined) => {
    const jobs = await contentful.getEntries<Job>({ content_type: 'job', locale, include: 2,
      'fields.id': id })
    return jobs.items[0]
  },
  tags: async (locale: string=undefined) => {
    const tags = await contentful.getEntries<Tag>({ content_type: 'tag', locale, include: 2 })
    return tags
  },
  // categories: async (locale: string) => {
  //   const categories = await contentful.getEntries<ArticleCategory>({ content_type: 'articleCategory', locale })
  //   return categories.items.reduce((reduction, category)=> {
  //     reduction[category.fields.id] = category
  //     return reduction
  //   }, {} as {[identifier: string]: Entry<ArticleCategory>})
  // },
}
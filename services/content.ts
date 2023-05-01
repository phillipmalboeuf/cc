
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
  content: Entry<Index & Text & Cards & Gallery & Team>[]
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

export interface Team {
  title: string
  members: Entry<Member>[]
}

export interface Article {
  titre: string
  id: string
  tags: string[]
  excerpt: string
  publishedAt: Date
  text: Document
  photo: Asset
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
    const articles = await contentful.getEntries<Article>({ content_type: 'article', locale, include: 2,
      'fields.id': id })
    return articles.items[0]
  },
  articles: async (tag: string, page: number, sort: string, locale: string, limitOverride?: number) => {
    const articles = await contentful.getEntries<Article>({ content_type: 'article', locale, include: 3,
      'fields.tags': tag,
      'fields.publishedAt[lte]': new Date().toISOString(),
      limit: (limitOverride || limit),
      skip: page ? page * (limitOverride || limit) : 0,
      order: {
        'newest': '-fields.publishedAt',
        'oldest': 'fields.publishedAt'
      }[sort as string || 'newest'] })
    return articles
  },
  // categories: async (locale: string) => {
  //   const categories = await contentful.getEntries<ArticleCategory>({ content_type: 'articleCategory', locale })
  //   return categories.items.reduce((reduction, category)=> {
  //     reduction[category.fields.id] = category
  //     return reduction
  //   }, {} as {[identifier: string]: Entry<ArticleCategory>})
  // },
}
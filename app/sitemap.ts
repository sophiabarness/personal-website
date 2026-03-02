import { getBlogPosts } from 'app/portfolio/utils'

export const baseUrl = 'https://sonya.dev'

export default async function sitemap() {
    let blogs = getBlogPosts().map((post) => ({
        url: `${baseUrl}/portfolio/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    let routes = ['', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogs]
}

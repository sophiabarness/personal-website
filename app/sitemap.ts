export const baseUrl = 'https://sonya.dev'

export default async function sitemap() {
    let routes = ['', '/agent', '/portfolio'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes]
}

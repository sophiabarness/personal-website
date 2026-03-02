import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Sophia Barnes',
        template: '%s | Sophia Barnes',
    },
    description: 'Developer, creator, and lifelong learner.',
    openGraph: {
        title: 'Sophia Barnes',
        description: 'Developer, creator, and lifelong learner.',
        url: baseUrl,
        siteName: 'Sophia Barnes',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cx(
                'text-black bg-white dark:text-white dark:bg-neutral-950',
                GeistSans.variable,
                GeistMono.variable
            )}
        >
            <body suppressHydrationWarning className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto">
                <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
                    <Navbar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}

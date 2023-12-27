import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/nav-bar'
import { TitleChanger } from '@/components/title-changer'
import { NavMob } from '@/components/nav-mob'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
    title: 'AniSchedule',
    description:
        'Plan and enjoy your anime watching with AniSchedule. View the current airing anime schedule, bookmark your favorite anime, and access them offline with PWA. Join the AniSchedule community and share your anime passion.',
    manifest: '/manifest.json',
}

export const viewport: Viewport = {
    themeColor: '#3367D6',
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    'flex min-h-screen flex-col',
                    GeistSans.className,
                )}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <TitleChanger>
                        <Navbar />
                        {children}
                        <NavMob />
                    </TitleChanger>
                </ThemeProvider>
            </body>
        </html>
    )
}

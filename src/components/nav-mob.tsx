'use client'

import { Home, Heart, Bookmark } from 'lucide-react'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NavMob = () => {
    const pathname = usePathname()

    return (
        <div className='sticky bottom-0 z-20 mt-auto flex items-center justify-around gap-3 bg-muted py-2 shadow-md md:hidden'>
            <Link
                href='/'
                className={buttonVariants({
                    variant: 'link',
                    className: 'flex flex-col items-center',
                })}
            >
                <Home
                    className={cn('fill-primary text-primary', {
                        'fill-blue-500 text-blue-500': pathname === '/',
                    })}
                />
            </Link>
            <Link
                href={'/favorites'}
                className={buttonVariants({
                    variant: 'link',
                })}
            >
                <Heart
                    className={cn('fill-primary text-primary', {
                        'fill-blue-500 text-blue-500':
                            pathname === '/favorites',
                    })}
                />
            </Link>
            <Link
                href={'/bookmarks'}
                className={buttonVariants({
                    variant: 'link',
                })}
            >
                <Bookmark
                    className={cn('fill-primary text-primary', {
                        'fill-blue-500 text-blue-500':
                            pathname === '/bookmarks',
                    })}
                />
            </Link>
        </div>
    )
}

'use client'

import { titleAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { SettingsDrawer } from './settings-drawer'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export const Navbar = () => {
    const [title] = useAtom(titleAtom)

    return (
        <div className='mb-5 flex items-center justify-between gap-3 border-b px-5 py-5 shadow-md sm:px-20'>
            <span className='text-2xl font-bold'>{title}</span>

            <div className='hidden gap-3 md:flex'>
                <Link
                    href='/'
                    className={buttonVariants({
                        variant: 'link',
                    })}
                >
                    Home
                </Link>
                <Link
                    href={'/favorites'}
                    className={buttonVariants({
                        variant: 'link',
                    })}
                >
                    Favorites
                </Link>
                <Link
                    href={'/bookmarks'}
                    className={buttonVariants({
                        variant: 'link',
                    })}
                >
                    Bookmarks
                </Link>
            </div>

            <div className='flex items-center gap-3'>
                <ThemeToggle />
                <SettingsDrawer />
            </div>
        </div>
    )
}

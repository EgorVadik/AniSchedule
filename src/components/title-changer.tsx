'use client'

import { capitalize, getSeasonAndYear } from '@/lib/helper'
import { titleAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const TitleChanger = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname()
    const [, setTitle] = useAtom(titleAtom)

    useEffect(() => {
        if (pathName === '/') {
            const { season, year } = getSeasonAndYear()
            setTitle(`${capitalize(season)} ${year}`)
            return
        }

        if (pathName === '/favorites') {
            setTitle('Favorites')
            return
        }

        if (pathName === '/bookmarks') {
            setTitle('Bookmarks')
            return
        }
    }, [pathName, setTitle])

    return <>{children}</>
}

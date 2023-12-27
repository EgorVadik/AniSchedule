'use client'

import React, { useMemo } from 'react'
import { Input } from './ui/input'
import { useAtom } from 'jotai'
import { filteredAnimeDataAtom } from '@/state/atoms'
import { Anime } from '@/types'
import { getLocalStorageData } from '@/lib/helper'

export const SearchBar = ({
    animeData,
    isFavorite = false,
}: {
    animeData: Anime[]
    isFavorite?: boolean
}) => {
    const [, setFilteredAnimeData] = useAtom(filteredAnimeDataAtom)
    const data = useMemo(() => {
        if (isFavorite) {
            const ids = getLocalStorageData('favorites')
            return animeData.filter((a) => ids.includes(a.id))
        }

        return animeData
    }, [animeData, isFavorite])

    return (
        <Input
            placeholder='Search'
            onChange={(e) => {
                const value = e.target.value.toLowerCase().trim()
                const filtered = data.filter((anime) => {
                    return (
                        anime.title.toLowerCase().includes(value) ||
                        anime.englishTitle.toLowerCase().includes(value)
                    )
                })
                setFilteredAnimeData(filtered)
            }}
        />
    )
}

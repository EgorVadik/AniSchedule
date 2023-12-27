import { Anime } from '@/types'
import { useEffect, useState } from 'react'
import { useFilteredData } from './use-filtered-data'
import { getLocalStorageData } from '@/lib/helper'

type UseFavoriteDataProps = {
    initialData: Anime[]
}

export const useFavoriteData = ({ initialData }: UseFavoriteDataProps) => {
    const [favorites, setFavorites] = useState<Anime[]>([])
    const { filteredAnimeData, setFilteredAnimeData } = useFilteredData({
        initialData: favorites,
    })

    useEffect(() => {
        const ids = getLocalStorageData('favorites')
        setFavorites(initialData.filter((a) => ids.includes(a.id)))
    }, [initialData])

    return {
        filteredAnimeData,
        setFilteredAnimeData,
    }
}

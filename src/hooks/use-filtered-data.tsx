import {
    checkDay,
    isFavorite,
    sortByDate,
    sortByRating,
    sortByTitle,
} from '@/lib/helper'
import { filterAtom, filteredAnimeDataAtom, sortAtom } from '@/state/atoms'
import { Anime } from '@/types'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

type UseFilteredDataProps = {
    initialData: Anime[]
}

export const useFilteredData = ({ initialData }: UseFilteredDataProps) => {
    const [filteredAnimeData, setFilteredAnimeData] = useAtom(
        filteredAnimeDataAtom,
    )
    const [filter] = useAtom(filterAtom)
    const [sort] = useAtom(sortAtom)

    useEffect(() => {
        setFilteredAnimeData(
            initialData.map((anime) => {
                anime.isFavorite = isFavorite(anime.id)
                return anime
            }),
        )
    }, [initialData, setFilteredAnimeData])

    useEffect(() => {
        const handleFilterAndSort = () => {
            let filteredData = initialData
            if (filter !== 'none') {
                filteredData = initialData.filter((anime) =>
                    checkDay(filter, anime.nextEpsDate),
                )
            }

            let sortedData = filteredData
            if (sort !== 'none') {
                switch (sort) {
                    case 'date':
                        sortedData = sortByDate(filteredData)
                        break
                    case 'title':
                        sortedData = sortByTitle(filteredData)
                        break
                    case 'rating':
                        sortedData = sortByRating(filteredData)
                        break
                }
            }

            setFilteredAnimeData(sortedData)
        }
        handleFilterAndSort()
    }, [filter, sort, initialData, setFilteredAnimeData])

    return {
        filteredAnimeData,
        setFilteredAnimeData,
    }
}

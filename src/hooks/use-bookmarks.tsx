import { useAtom } from 'jotai'
import { Anime, BookmarkedAnime } from '@/types'
import { getBookmarks } from '@/lib/helper'
import { useEffect } from 'react'
import { bookmarksAtom } from '../state/atoms'
import { useFavoriteData } from './use-favorite-data'

type Props = {
    initialData: Anime[]
}

export const useBookmarks = ({ initialData }: Props) => {
    const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
    const { filteredAnimeData } = useFavoriteData({ initialData })

    useEffect(() => {
        if (filteredAnimeData.length === 0) return

        const _bookmarksIds = getBookmarks()
        const _bookmarks: BookmarkedAnime[] = _bookmarksIds
            .map((bookmark) => {
                const index = filteredAnimeData.findIndex(
                    (favorite) => favorite.id === bookmark.id,
                )
                if (index !== -1) {
                    return {
                        ...filteredAnimeData[index],
                        currentEps: bookmark.currentEps,
                    }
                }

                return {
                    ...filteredAnimeData[index],
                    currentEps: 0,
                }
            })
            .filter((el) => el.title !== undefined)

        setBookmarks(_bookmarks)
    }, [filteredAnimeData, setBookmarks])

    return {
        bookmarks,
    }
}

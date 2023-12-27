'use client'

import { settingsAtom } from '@/state/atoms'
import { Anime } from '@/types'
import { useAtom } from 'jotai'
import { SearchBar } from './search-bar'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { BookmarkCard } from './bookmark-card'

type WrapperProps = {
    initialData: Anime[]
    isFavorites?: boolean
}

export const BookmarkWrapper = ({ initialData }: WrapperProps) => {
    const [settings] = useAtom(settingsAtom)
    const { bookmarks } = useBookmarks({
        initialData,
    })

    return (
        <main className='px-5 sm:px-20'>
            <SearchBar animeData={initialData} isFavorite />
            <div className='mt-5 flex flex-wrap justify-center gap-5'>
                {bookmarks.length > 0 ? (
                    bookmarks.map((anime) => (
                        <BookmarkCard
                            key={anime.id}
                            anime={anime}
                            japanese={settings.japanese}
                        />
                    ))
                ) : (
                    <p className='py-20 text-center text-2xl text-muted-foreground'>
                        No bookmarks found
                    </p>
                )}
            </div>
        </main>
    )
}

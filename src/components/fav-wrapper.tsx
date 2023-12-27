'use client'

import { settingsAtom } from '@/state/atoms'
import { Anime } from '@/types'
import { useAtom } from 'jotai'
import { SearchBar } from './search-bar'
import { DataCard } from './data-card'
import { useFavoriteData } from '@/hooks/use-favorite-data'

type WrapperProps = {
    initialData: Anime[]
    isFavorites?: boolean
}

export const FavWrapper = ({ initialData }: WrapperProps) => {
    const [settings] = useAtom(settingsAtom)
    const { filteredAnimeData } = useFavoriteData({
        initialData,
    })

    return (
        <main className='px-5 sm:px-20'>
            <SearchBar animeData={initialData} isFavorite />
            <div className='mt-5 flex flex-wrap justify-center gap-5'>
                {filteredAnimeData.length > 0 ? (
                    filteredAnimeData.map((anime, i) => (
                        <DataCard
                            key={anime.id}
                            anime={anime}
                            japanese={settings.japanese}
                            index={i}
                        />
                    ))
                ) : (
                    <p className='py-20 text-center text-2xl text-muted-foreground'>
                        No favorites found
                    </p>
                )}
            </div>
        </main>
    )
}

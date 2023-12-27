'use client'

import { useFilteredData } from '@/hooks/use-filtered-data'
import { settingsAtom } from '@/state/atoms'
import { Anime } from '@/types'
import { useAtom } from 'jotai'
import { SearchBar } from './search-bar'
import { DataCard } from './data-card'

type WrapperProps = {
    initialData: Anime[]
}

export const Wrapper = ({ initialData }: WrapperProps) => {
    const [settings] = useAtom(settingsAtom)
    const { filteredAnimeData } = useFilteredData({
        initialData,
    })

    return (
        <main className='px-5 sm:px-20'>
            <SearchBar animeData={initialData} />
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
                        No results found
                    </p>
                )}
            </div>
        </main>
    )
}

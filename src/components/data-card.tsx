'use client'

import {
    dateToString,
    formatStartDate,
    storeBookmarks,
    storeLocalStorageData,
} from '@/lib/helper'
import { cn } from '@/lib/utils'
import { Anime } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useAtom } from 'jotai'
import { filteredAnimeDataAtom } from '@/state/atoms'
import Link from 'next/link'
import { motion } from 'framer-motion'

type DataCardProps = {
    anime: Anime
    japanese: boolean
    index: number
}

export const DataCard = ({ anime, japanese, index }: DataCardProps) => {
    const [, setFilteredAnimeData] = useAtom(filteredAnimeDataAtom)
    const [initialRender, setInitialRender] = useState(true)

    React.useEffect(() => {
        setInitialRender(false)
    }, [])

    return (
        <motion.div
            transition={{ delay: initialRender ? index * 0.03 : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{
                scale: 1.1,
                position: 'relative',
                zIndex: 999,
                transition: { delay: 0 },
            }}
        >
            <Link
                href={`/anime/${anime.id}`}
                className='relative flex flex-col gap-2'
            >
                <Image
                    src={anime.img}
                    alt={anime.title}
                    width={200}
                    height={250}
                    className='w-[9.5rem] rounded-md object-cover sm:w-[12.5rem]'
                />
                <div className='flex max-w-[9.5rem] items-center gap-2 sm:max-w-[12.5rem]'>
                    <div className='text-balance'>
                        <div className='text-sm text-muted-foreground'>
                            {anime.nextEpsNumber === undefined
                                ? typeof anime.startDate === 'string'
                                    ? anime.startDate
                                    : formatStartDate(anime.startDate)
                                : `EP: ${
                                      anime.nextEpsNumber ?? '?'
                                  } at ${dateToString(anime.nextEpsDate)}`}
                        </div>
                        <div className='line-clamp-2 font-semibold'>
                            {japanese ? anime.title : anime.englishTitle}
                        </div>
                    </div>
                    <Button
                        variant={'outline'}
                        size={'icon'}
                        className='absolute left-2 top-2 z-10 grid h-8 w-8 place-content-center rounded-full'
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setFilteredAnimeData((prev) => {
                                const _prev = [...prev]
                                const index = _prev.findIndex(
                                    (el) => el.id === anime.id,
                                )
                                _prev[index].isFavorite =
                                    !_prev[index].isFavorite
                                return _prev
                            })

                            storeLocalStorageData('favorites', anime.id)
                            storeBookmarks({
                                id: anime.id,
                                currentEps: 0,
                                newBookmark: true,
                            })
                        }}
                    >
                        <Heart
                            size={20}
                            className={cn(
                                anime.isFavorite
                                    ? 'fill-red-600 text-red-600'
                                    : '',
                            )}
                        />
                    </Button>
                </div>
            </Link>
        </motion.div>
    )
}

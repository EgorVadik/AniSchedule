'use client'

import { storeBookmarks } from '@/lib/helper'
import { BookmarkedAnime } from '@/types'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { useAtom } from 'jotai'
import { bookmarksAtom } from '@/state/atoms'
import Link from 'next/link'
import { motion } from 'framer-motion'

type BookmarkCardProps = {
    anime: BookmarkedAnime
    japanese: boolean
}

export const BookmarkCard = ({ anime, japanese }: BookmarkCardProps) => {
    const [, setBookmarkedAnimData] = useAtom(bookmarksAtom)
    const plusDisabled =
        anime.currentEps === anime.nextEpsNumber ||
        anime.currentEps === anime.totalEps
    const minusDisabled = anime.currentEps === 0

    const handleClick = async (updateVal: 1 | -1) => {
        setBookmarkedAnimData((prev) => {
            const _prev = [...prev]
            const index = _prev.findIndex((el) => el.id === anime.id)
            if (
                (_prev[index].currentEps === 0 && updateVal === -1) ||
                (_prev[index].currentEps === _prev[index].totalEps &&
                    updateVal === 1)
            ) {
                return prev
            }

            storeBookmarks({
                id: anime.id,
                currentEps: anime.currentEps + updateVal,
            })
            _prev[index].currentEps += updateVal
            return _prev
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1, position: 'relative', zIndex: 999 }}
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
                        <div className='line-clamp-2 font-semibold'>
                            {japanese ? anime.title : anime.englishTitle}
                        </div>
                        <div>
                            Current Episode: {anime.currentEps} of{' '}
                            {anime.totalEps ?? '?'}
                        </div>
                    </div>
                    <Button
                        variant={'outline'}
                        size={'icon'}
                        disabled={minusDisabled}
                        className='absolute left-2 top-2 z-10 grid h-8 w-8 place-content-center rounded-full'
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleClick(-1)
                        }}
                    >
                        <Minus size={20} />
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'icon'}
                        disabled={plusDisabled}
                        className='absolute right-2 top-2 z-10 grid h-8 w-8 place-content-center rounded-full'
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleClick(1)
                        }}
                    >
                        <Plus size={20} />
                    </Button>
                </div>
            </Link>
        </motion.div>
    )
}

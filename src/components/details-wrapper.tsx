'use client'

import { dateToString, formatStartDate } from '@/lib/helper'
import { Anime } from '@/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const DetailsWrapper = ({ anime }: { anime: Anime }) => {
    return (
        <main className='flex flex-col items-center justify-center gap-y-5 px-5 sm:px-20 md:flex-row md:py-20'>
            <motion.div layout>
                <div className='w-[9.5rem] sm:w-[12.5rem]'>
                    <Image
                        src={anime?.img!}
                        alt={anime?.title!}
                        width={200}
                        height={250}
                        className='w-[9.5rem] rounded-md object-cover sm:w-[12.5rem]'
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='ml-5 flex flex-col gap-2'
            >
                <div className='text-balance'>
                    <div className='text-sm text-muted-foreground'>
                        {anime?.nextEpsNumber === undefined
                            ? typeof anime?.startDate === 'string'
                                ? anime?.startDate
                                : formatStartDate(
                                      anime?.startDate ?? new Date(),
                                  )
                            : `EP: ${
                                  anime?.nextEpsNumber ?? '?'
                              } at ${dateToString(anime?.nextEpsDate)}`}
                    </div>
                    <div className='line-clamp-2 font-semibold'>
                        {anime?.title}
                    </div>
                </div>

                <div className='text-sm text-muted-foreground'>
                    {anime?.synopsis}
                </div>

                <div className='flex gap-2'>
                    {anime?.tags.map((tag) => (
                        <div
                            key={tag}
                            className='text-sm text-muted-foreground'
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                <div className='flex gap-2'>
                    {anime?.source && (
                        <div className='text-sm text-muted-foreground'>
                            {anime.source}
                        </div>
                    )}

                    {anime?.rating && (
                        <div className='text-sm text-muted-foreground'>
                            {anime.rating}
                        </div>
                    )}
                </div>
            </motion.div>
        </main>
    )
}

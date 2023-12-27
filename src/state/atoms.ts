import { Anime, BookmarkedAnime, Filter, Settings, Sort } from '@/types'
import { atom } from 'jotai'

export const filteredAnimeDataAtom = atom<Anime[]>([])
export const bookmarksAtom = atom<BookmarkedAnime[]>([])
export const isOpenAtom = atom<boolean>(false)
export const settingsAtom = atom<Settings>({
    japanese: false,
})
export const filterAtom = atom<Filter>('none')
export const sortAtom = atom<Sort>('none')

export const titleAtom = atom<string>('')

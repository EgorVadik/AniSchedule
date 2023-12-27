export interface Anime {
    id: string
    title: string
    englishTitle: string
    startDate: Date | string
    img: string
    malLink: string
    nextEpsDate: Date
    nextEpsNumber?: number
    totalEps?: number
    synopsis: string
    source: string
    rating: number
    tags: string[]
    isFavorite: boolean
}

export interface BookmarkedAnime extends Anime {
    currentEps: number
}

export type BookmarkedAnimeStore = Pick<Anime, 'id'> & { currentEps: number }

export interface Settings {
    japanese: boolean
}

export type Filter =
    | 'none'
    | 'sun'
    | 'mon'
    | 'tue'
    | 'wed'
    | 'thu'
    | 'fri'
    | 'sat'
export type Sort = 'none' | 'date' | 'title' | 'rating'

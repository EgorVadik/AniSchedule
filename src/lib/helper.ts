import moment from 'moment'
import { Anime, BookmarkedAnimeStore, Filter, Settings } from '@/types'

export const getSeasonAndYear = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const season =
        currentMonth >= 1 && currentMonth <= 3
            ? 'winter'
            : currentMonth >= 4 && currentMonth <= 6
              ? 'spring'
              : currentMonth >= 7 && currentMonth <= 9
                ? 'summer'
                : currentMonth >= 10 && currentMonth <= 12
                  ? 'fall'
                  : ''
    return {
        season,
        year: currentDate.getFullYear(),
    }
}

export const stringToTime = (time: string): Date | string => {
    if (moment(time, 'MMM D, YYYY [at] h:mma z').isValid()) {
        return moment(time, 'MMM D, YYYY [at] h:mma z').toDate()
    }
    return time
}

export const convertJstToGmtPlus2 = (time: Date): Date => {
    return time
}

export const epochToDate = (epoch: string): Date => {
    const epochInt = parseInt(epoch)
    return moment(epochInt * 1000).toDate()
}

export const dateToString = (date: Date): string => {
    return moment(date).format('ddd, MMM D, YYYY [at] h:mma')
}

export const formatStartDate = (startDate: Date): string => {
    return moment(startDate).format('[Started] [at] MMMM D, YYYY')
}

export const parseTotalEpisodes = (totalEps: string): number => {
    return parseInt(totalEps.split(' x ')[0])
}

export const parseRating = (rating: string): number => {
    return parseFloat(rating.split(' ')[0] ?? '0')
}

export const formatSynopsis = (synopsis: string): string => {
    return synopsis.split('[Source:')[0]
}

export const storeLocalStorageData = (key: string, value: any) => {
    try {
        const ids = localStorage.getItem(key)
        if (ids === null) {
            localStorage.setItem(key, JSON.stringify([value]))
            return
        }

        const idsArray = JSON.parse(ids)
        if (idsArray.includes(value)) {
            idsArray.splice(idsArray.indexOf(value), 1)
            localStorage.setItem(key, JSON.stringify(idsArray))
            return
        }
        idsArray.push(value)
        localStorage.setItem(key, JSON.stringify(idsArray))
    } catch (error: any) {}
}

export const getLocalStorageData = (key: string) => {
    try {
        const ids = localStorage.getItem(key)
        if (ids === null) {
            return []
        }
        return JSON.parse(ids) as String[]
    } catch (error: any) {
        return []
    }
}

export const clearLocalStorageData = (key: string) => {
    try {
        localStorage.removeItem(key)
    } catch (error: any) {}
}

export const isFavorite = (id: string) => {
    const ids = getLocalStorageData('favorites')
    return ids.includes(id)
}

export const storeSettings = (settings: any) => {
    try {
        localStorage.setItem('settings', JSON.stringify(settings))
    } catch (error: any) {}
}

export const getSettings = () => {
    try {
        const settings = localStorage.getItem('settings')
        if (settings === null) {
            return {
                japanese: true,
            }
        }
        return JSON.parse(settings) as Settings
    } catch (error: any) {
        return {
            japanese: true,
        }
    }
}

export const storeBookmarks = ({
    id,
    currentEps,
    newBookmark = false,
}: BookmarkedAnimeStore & { newBookmark?: boolean }) => {
    try {
        const bookmarks = getBookmarks()
        const bookmark = bookmarks.find((bookmark) => bookmark.id === id)

        if (bookmark && newBookmark) {
            bookmarks.splice(bookmarks.indexOf(bookmark), 1)
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
            return
        }

        if (bookmark) {
            bookmark.currentEps = currentEps
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
            return
        }
        bookmarks.push({ id, currentEps })
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } catch (error: any) {}
}

export const getBookmarks = () => {
    try {
        const bookmarks = localStorage.getItem('bookmarks')
        if (bookmarks === null) {
            return []
        }
        return JSON.parse(bookmarks) as BookmarkedAnimeStore[]
    } catch (error: any) {
        return []
    }
}

export const checkDay = (day: Filter, date: Date) => {
    if (date.getFullYear() === 1970) return false
    const dayIndex = date.getDay()
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return days[dayIndex] === day
}

export const sortByDate = (animeData: Anime[]) => {
    return [...animeData].sort((a, b) => {
        const aDate = a.nextEpsDate.getTime()
        const bDate = b.nextEpsDate.getTime()
        return aDate - bDate
    })
}

export const sortByTitle = (animeData: Anime[]) => {
    return [...animeData].sort((a, b) => {
        const aTitle = a.title.toLowerCase()
        const bTitle = b.title.toLowerCase()
        return aTitle.localeCompare(bTitle)
    })
}

export const sortByRating = (animeData: Anime[]) => {
    return [...animeData].sort((a, b) => {
        const aRating = a.rating
        const bRating = b.rating
        return bRating - aRating
    })
}

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

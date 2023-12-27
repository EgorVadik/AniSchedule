import { getAnimeData } from '@/actions'
import { BookmarkWrapper } from '@/components/bookmark-wrapper'

export default async function page() {
    const animeData = await getAnimeData()
    return <BookmarkWrapper initialData={animeData} />
}

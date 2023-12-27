import { getAnimeData } from '@/actions'
import { FavWrapper } from '@/components/fav-wrapper'

export default async function page() {
    const animeData = await getAnimeData()
    return <FavWrapper initialData={animeData} />
}

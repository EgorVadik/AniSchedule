import { getAnimeData } from '@/actions'
import { Wrapper } from '@/components/wrapper'

export default async function Home() {
    const animeData = await getAnimeData()
    return <Wrapper initialData={animeData} />
}

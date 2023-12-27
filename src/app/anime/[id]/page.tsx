import { getAnimeData } from '@/actions'
import { DetailsWrapper } from '@/components/details-wrapper'
import { notFound } from 'next/navigation'

export default async function page({
    params: { id },
}: {
    params: { id: string }
}) {
    const animeData = await getAnimeData()
    const anime = animeData.find((anime) => anime.id === id)

    if (!anime) {
        notFound()
    }

    return <DetailsWrapper anime={anime} />
}

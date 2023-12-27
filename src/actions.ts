'use server'

import { load } from 'cheerio'
import {
    epochToDate,
    formatSynopsis,
    getLocalStorageData,
    getSeasonAndYear,
    isFavorite,
    parseRating,
    parseTotalEpisodes,
    stringToTime,
} from './lib/helper'
import { Anime } from './types'

export const getAnimeData = async () => {
    const { season, year } = getSeasonAndYear()
    const res = await fetch(`https://www.livechart.me/${season}-${year}/tv`, {
        next: {
            revalidate: 3600,
        },
    })
    const data = await res.text()
    const $ = load(data)

    const animeArticles = $('.anime')
    const _animeData: Anime[] = animeArticles.toArray().map((el) => {
        const animeCard = $(el).find('.anime-card')[0]
        const title = $(animeCard).find('h3.main-title').text()
        const id = $(el).attr('data-anime-id') ?? title
        const startDate = stringToTime(
            $(animeCard).find('div.anime-date').text(),
        )

        const anime: Anime = {
            id,
            title: title ?? '',
            englishTitle:
                $(el).attr('data-english') ??
                $(el).attr('data-romaji') ??
                title ??
                '',
            img: $(animeCard).find('img').attr('src') ?? '',
            nextEpsDate: epochToDate(
                $(animeCard)
                    .find('time.episode-countdown')
                    .attr('data-timestamp') ?? '0',
            ),
            nextEpsNumber:
                parseInt(
                    $(animeCard)
                        .find('time.episode-countdown')
                        .attr('data-label')
                        ?.replace('EP', '') ?? '0',
                ) || undefined,
            startDate,
            malLink:
                $(animeCard)
                    .find('ul.related-links li > a.mal-icon')
                    .attr('href') ?? '',
            totalEps: parseTotalEpisodes(
                $(animeCard)
                    .find('div.anime-metadata div.anime-episodes')
                    .text(),
            ),
            source:
                $(animeCard)
                    .find('div.anime-metadata div.anime-source')
                    .text() ?? '',
            synopsis: formatSynopsis(
                $(animeCard).find('div.anime-synopsis > p').text() ?? '',
            ),
            rating: parseRating(
                $(animeCard)
                    .find('div.anime-extras > div.anime-avg-user-rating')
                    .text(),
            ),
            tags: $(animeCard)
                .find('ol.anime-tags > li')
                .toArray()
                .map((el) => $(el).text()),
            isFavorite: false,
        }
        return anime
    })

    return _animeData
}

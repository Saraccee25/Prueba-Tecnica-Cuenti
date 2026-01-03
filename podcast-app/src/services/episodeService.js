import Parser from 'rss-parser';
import axios from 'axios';

const CORS_PROXY = "https://api.allorigins.win/raw?url=";

const parser = new Parser();

export const getEpisodesFromFeed = async (feedUrl) => {
    if (!feedUrl) return [];

    const res = await axios.get(CORS_PROXY + encodeURIComponent(feedUrl));
    const xml = res.data;
    const feed = await parser.parseString(xml);

    return feed.items.map((item, index) => ({
        id: item.guid || item.link || index.toString(),
        title: item.title || "Sin título",
        pubDate: item.pubDate || "",
        link: item.link || "",
        duration: item.itunes ? item.itunes.duration : "",
        audioUrl: item.enclosure ? item.enclosure.url : "",
        description: item.contentSnippet || "",
    }));
};
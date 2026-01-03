import axios from 'axios';

const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const TOP_PODCASTS_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json";
const LOOKUP_URL = "https://itunes.apple.com/lookup?id={id}";

export const getTopPodcasts = async () => {
    const response = await axios.get(CORS_PROXY + encodeURIComponent(TOP_PODCASTS_URL));
    const entries = response.data.feed.entry;

    return entries.map((podcast) => ({
        id: podcast.id.attributes['im:id'],
        title: podcast['im:name'].label,
        author: podcast['im:artist'].label,
        image: podcast['im:image'][2].label,
        summary: podcast.summary.label || "",
    }));
};

export const getPodcastById = async (podcastId) => {
    const response = await axios.get(CORS_PROXY + encodeURIComponent(LOOKUP_URL.replace("{id}", podcastId)));
    const podcast = response.data.results[0];

    if(!podcast) return null;

    return {
        id: podcast.trackId || podcastId,
        title: podcast.trackName || podcast.collectionName,
        author: podcast.artistName || "",
        description: podcast.description,
        image: podcast.artworkUrl100,
        feedUrl: podcast.feedUrl || "",
    };
};
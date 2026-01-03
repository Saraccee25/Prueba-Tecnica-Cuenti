import axios from 'axios';

const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const TOP_PODCASTS_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json";

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

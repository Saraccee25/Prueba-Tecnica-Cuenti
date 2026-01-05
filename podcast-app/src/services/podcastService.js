import axios from 'axios';

const CORS_PROXY = "https://api.allorigins.win/get?url=";
const TOP_PODCASTS_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json";
const LOOKUP_URL = "https://itunes.apple.com/lookup?id={id}";

export const getTopPodcasts = async () => {
  const response = await axios.get(
    CORS_PROXY + TOP_PODCASTS_URL,
    { timeout: 55000 }
  );


  const data = JSON.parse(response.data.contents);
  const entries = data.feed.entry;

  return entries.map((podcast) => ({
    id: podcast.id.attributes['im:id'],
    title: podcast['im:name'].label,
    author: podcast['im:artist'].label,
    image: podcast['im:image'][2].label,
    summary: podcast.summary?.label || "",
  }));
};

export const getPodcastById = async (podcastId) => {
  const response = await axios.get(
    CORS_PROXY + LOOKUP_URL.replace("{id}", podcastId),
    { timeout: 55000 }
  );

  const data = JSON.parse(response.data.contents);
  const podcast = data.results?.[0];

  if (!podcast) return null;

  return {
    id: podcast.trackId || podcastId,
    title: podcast.trackName || podcast.collectionName,
    author: podcast.artistName || "",
    description: podcast.description || "",
    image: podcast.artworkUrl100 || "",
    feedUrl: podcast.feedUrl || "",
  };
};


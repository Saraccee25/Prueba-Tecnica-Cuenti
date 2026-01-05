import axios from "axios";

const TOP_PODCASTS_URL =
  "/rss/us/rss/toppodcasts/limit=10/genre=1310/json";

export const getTopPodcasts = async () => {
  const response = await axios.get(TOP_PODCASTS_URL);
  const entries = response.data.feed.entry;

  return entries.map((podcast) => ({
    id: podcast.id.attributes['im:id'],
    title: podcast['im:name'].label,
    author: podcast['im:artist'].label,
    image: podcast['im:image'][2].label,
    summary: podcast.summary?.label || "",
  }));
};

export const getPodcastById = async (podcastId) => {
  const response = await axios.get(`/api/lookup?id=${podcastId}`);
  const podcast = response.data.results?.[0];

  if (!podcast) return null;

  return {
    id: podcast.trackId,
    title: podcast.trackName,
    author: podcast.artistName,
    description: podcast.description || "",
    image: podcast.artworkUrl100,
    feedUrl: podcast.feedUrl,
  };
};

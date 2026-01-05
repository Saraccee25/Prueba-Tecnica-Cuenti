import axios from "axios";

export const getEpisodesFromPodcastId = async (podcastId) => {
  const response = await axios.get(
    `/api/lookup?id=${podcastId}&entity=podcastEpisode`
  );

  const results = response.data.results || [];

  const episodes = results.filter(
    (item) => item.wrapperType === "podcastEpisode"
  );

  return episodes.map((episode) => ({
    id: episode.trackId.toString(),
    title: episode.trackName || "",
    description: episode.description || episode.shortDescription || "",
    audioUrl: episode.episodeUrl || "",
    pubDate: episode.releaseDate || "",
  }));
};

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import Sidebar from "../components/SideBar"
import { getPodcastById } from "../services/podcastService"
import { getEpisodesFromFeed } from "../services/episodeService"

const EpisodeDetailPage = () => {
  const { podcastId, episodeId } = useParams()

  const [podcast, setPodcast] = useState(null)
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
       
        const podcastData = await getPodcastById(podcastId)
        setPodcast(podcastData)

      
        const episodes = await getEpisodesFromFeed(podcastData.feedUrl)

       
        const selectedEpisode = episodes.find(
          (ep) => encodeURIComponent(ep.id) === episodeId
        )

        setEpisode(selectedEpisode)
      } catch (error) {
        console.error("Error loading episode detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodeDetail()
  }, [podcastId, episodeId])

  if (loading) return <Loader />

  if (!episode || !podcast) {
    return <p>No se pudo cargar el episodio.</p>
  }

  return (
    <div className="episode-page">

      <Sidebar podcast={podcast} />

      <main className="episode-content">
        <h2>{episode.title}</h2>


        {episode.audioUrl && (
          <audio controls src={episode.audioUrl} className="audio-player">
            Tu navegador no soporta audio HTML5
          </audio>
        )}

      
        <div
          className="episode-description"
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </main>
    </div>
  )
}

export default EpisodeDetailPage
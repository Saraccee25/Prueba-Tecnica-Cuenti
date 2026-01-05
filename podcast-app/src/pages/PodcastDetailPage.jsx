import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loader from "../components/Loader"
import { getPodcastById } from "../services/podcastService"
import { getEpisodesFromFeed } from "../services/episodeService"
import SideBar from "../components/SideBar";
import "../styles/PodcastDetail.css"



const formatDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const PodcastDetailPage = () => {
  const { podcastId } = useParams()

  const [podcast, setPodcast] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        console.log("podcastId: " + podcastId);
        const p = await getPodcastById(podcastId)
        console.log("check de error" + p);
        setPodcast(p)
        console.log("objeto" + p)
        const eps = await getEpisodesFromFeed(p.feedUrl)
        setEpisodes(eps)
      } catch (error) {
        console.error("Error loading podcast details:", error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [podcastId])

  if (loading) return <Loader />
  if (!podcast) return <div>Podcast no encontrado.</div>

  return (
    <div className="podcast-page">
      <SideBar podcast={podcast} />

      <main className="podcast-main">
        <h2>{podcast.title}</h2>
        <p>{episodes.length} episodios</p>

        <ul className="episode-list">
          {episodes.map((episode) => (
            <li key={episode.id} className="episode-item">
              <Link
                to={`/podcast/${podcast.id}/episode/${encodeURIComponent(
                  episode.id
                )}`}
              >
                <strong>{episode.title}</strong>
              </Link>

              <div className="episode-date">
                {formatDate(episode.pubDate)}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default PodcastDetailPage

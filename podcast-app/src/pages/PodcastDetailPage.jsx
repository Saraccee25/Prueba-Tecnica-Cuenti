import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loader from "../components/Loader"
import { getPodcastById } from "../services/podcastService"
import {  getEpisodesFromPodcastId } from "../services/episodeService"
import SideBar from "../components/SideBar"
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
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      
      try {
        console.log("Cargando podcast:", podcastId)
        
        const podcastData = await getPodcastById(podcastId)
        console.log("Podcast cargado:", podcastData)
        setPodcast(podcastData)

        const episodes = await getEpisodesFromPodcastId(podcastId)
        console.log("Episodios cargados:", episodes)
        
        setEpisodes(episodes);
        }
       catch (err) {
        console.error("Error al cargar el podcast:", err)
        setError(err.message || "Error al cargar el podcast")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [podcastId])

  if (loading) return <Loader />
  
  if (error) {
    return (
      <div className="error-container" style={{
        padding: '40px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#d32f2f', marginBottom: '16px' }}>
          Error al cargar el podcast
        </h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Reintentar
        </button>
      </div>
    )
  }
  
  if (!podcast) return <div>Podcast no encontrado.</div>

  return (
    <div className="podcast-page">
      <SideBar podcast={podcast} />

      <main className="podcast-main">
        <h2>{podcast.title}</h2>
        <p>{episodes.length} episodios</p>

        {episodes.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
            No hay episodios disponibles
          </p>
        ) : (
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
        )}
      </main>
    </div>
  )
}

export default PodcastDetailPage
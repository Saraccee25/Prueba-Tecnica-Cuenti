import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import { getTopPodcasts } from "../services/podcastService"
import "../styles/HomePage.css"

const HomePage = () => {
  const [podcasts, setPodcasts] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await getTopPodcasts()
        setPodcasts(data)
      } catch (error) {
        console.error("Error fetching podcasts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPodcasts()
  }, [])

  const filteredPodcasts = podcasts.filter((podcast) => {
    const title = podcast.title.toLowerCase()
    const author = podcast.author.toLowerCase()
    const search = filter.toLowerCase()

    return title.includes(search) || author.includes(search)
  })

  if (loading) return <Loader />

  return (
    <div className="home">
      <div className="home-header">
        <span className="podcast-count">{filteredPodcasts.length}</span>

        <input
          type="text"
          className="home-search"
          placeholder="Buscar podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="home-list">
        {filteredPodcasts.map((podcast) => (
          <Link
            key={podcast.id}
            to={`/podcast/${podcast.id}`}
            className="podcast-link"
          >
            <div className="podcast-card">
              <img src={podcast.image} alt={podcast.title} />
              <h3>{podcast.title}</h3>
              <p>Author: {podcast.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage

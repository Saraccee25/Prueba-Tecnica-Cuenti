import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import {getTopPodcasts} from '../services/podcastService'


const HomePage = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try{
               const data = await getPodcasts()
                setPodcasts(data); 
            }catch (error) {
                console.error('Error fetching podcasts:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, []);

    const filteredPodcasts = podcasts.filter((podcast) => {
        const title = podcast.title.toLowerCase();
        const author = podcast.author.toLowerCase();
        const search = filter.toLowerCase();

        return title.includes(search) || author.includes(search);
    });

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="home">
            <input
                type="text"
                placeholder="Buscar podcasts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className="home-list">
                {filteredPodcasts.map((podcast) => (
                    <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
                        <div className="podcast-card">
                            <img src={podcast.image} alt={podcast.title} />
                            <h3>{podcast.title}</h3>
                            <p>{podcast.author}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
import {Link} from "react-router-dom";
import "../styles/SideBar.css"


const SideBar = ({podcast}) => {
    return (
        <aside className="sidebar">
            <img src={podcast.image} alt={podcast.title} className="sidebar-image" />
            <h3><Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link></h3>
            <p>{podcast.author}</p>
            <div className="sidebar_desc">{podcast.description}</div>
        </aside>
    );
}

export default SideBar;
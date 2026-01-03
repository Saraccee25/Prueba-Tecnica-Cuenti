import {Link} from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div classname= "header-container">
                <Link to="/" classname="header-title">PodcastApp</Link>
            </div>
        </header>
    );
}

export default Header;
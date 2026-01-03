import {Link} from 'react-router-dom'
import '../styles/Header.css'

function Header() {
    return (
        <header className="header">
            <div classname= "header-container">
                <Link to="/" classname="header-title">Podcaster</Link>

                <nav className="header-nav">
                    <Link to="/" classname={` nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
                </nav> 
            </div>
        </header>
    );
}

export default Header;
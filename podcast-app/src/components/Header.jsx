import {Link} from 'react-router-dom'
import '../styles/Header.css'

function Header() {
    return (
        <header className="header">
            <div className= "header-container">
                <Link to="/" className="header-title">Podcaster</Link>

                <nav className="header-nav">
                    <Link to="/" className="header-link">Inicio</Link>
                </nav> 
            </div>
        </header>
    );
}

export default Header;
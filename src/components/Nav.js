import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className='nav'>
            <h3>logo</h3>
            <ul className="nav-links">
                <Link to="/breweries">
                    <li>Breweries</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;
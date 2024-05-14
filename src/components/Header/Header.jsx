import './Header.scss';
import logo from '../../assets/logo/bauk-logo.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function HeaderLogo() {
    return <Link to='/' className='header-logo'>
        <img className='header-logo__image' src={logo} alt="Logo" />
        <div className='header-logo__name'>
            <div className='header-logo__school-name'>BAUK</div>
            <div className='header-logo__brand-name'>Journal of Sociology</div>
        </div>
    </Link>
}

function HeaderNav() {
    const [activeIndex, setActiveIndex] = useState()

    return <div className='header_nav'>
        <Link className={`header_nav-link ${activeIndex === 0 ? 'header_nav-link--active' : ''}`} onClick={() => setActiveIndex(0)} to="/index">HOME</Link>
        <Link className={`header_nav-link ${activeIndex === 1 ? 'header_nav-link--active' : ''}`} onClick={() => setActiveIndex(1)} to="/issue/archive">ARCHIVES</Link>
        <Link className={`header_nav-link ${activeIndex === 2 ? 'header_nav-link--active' : ''}`} onClick={() => setActiveIndex(2)} to="/login">LOGIN</Link>
    </div>
}

function Header() {
    return <header className='header'>
        <HeaderLogo />
        <HeaderNav />
    </header>
}

export default Header;
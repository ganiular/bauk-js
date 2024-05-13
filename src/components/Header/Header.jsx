import './Header.scss';
import logo from '../../assets/logo/bauk-logo.jpg';
import { Link } from 'react-router-dom';

function HeaderLogo() {
    return <Link to='/' className='header-logo'>
        <img className='header-logo__image' src={logo} alt="Logo" />
        <div className='header-logo__name'>
            <div className='header-logo__school-name'>BAUK</div>
            <div className='header-logo__brand-name'>Journal of Sociology</div>
        </div>
    </Link>
}

function Header() {
    return <header className='header'>
        <HeaderLogo />
    </header>
}

export default Header;
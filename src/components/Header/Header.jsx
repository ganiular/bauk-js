import './Header.scss';
import logo from '../../assets/logo/bauk-logo.jpg';

function HeaderLogo() {
    return <div className='header-logo'>
        <img className='header-logo__image' src={logo} alt="Logo" />
        <div className='header-logo__name'>
            <div className='header-logo__school-name'>BAUK</div>
            <div className='header-logo__brand-name'>Journal of Sociology</div>
        </div>
    </div>
}

function Header() {
    return <header className='header'>
        <HeaderLogo />
    </header>
}

export default Header;
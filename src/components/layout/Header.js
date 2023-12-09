import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import AuthButton from '../../pages/auth/components/AuthButton';

import './Header.css';

const navItemClassName = ({ isActive }) =>
  clsx('header-nav-item', { active: isActive });

function Header({ className }) {
  return (
    <header className={clsx('header', className)}>
      <Link to="/">
        <div className="header-logo">
         Anuncios
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          replace
          className={navItemClassName}
        >
          New Advert
        </NavLink>
        <NavLink to="/adverts" className={navItemClassName} end>
          See latest adverts
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;

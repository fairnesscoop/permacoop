import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

const Menu: React.FC = () => {
  return (
    <>
      <Navbar bg={'light'} expand={'lg'} fixed={'top'}>
        <Link className={'navbar-brand'} to={'/'}>
          <img src={'/images/logo.png'} alt={'Fairness'} height={42} /> CoopERP
        </Link>
        <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
        <Navbar.Collapse id={'basic-navbar-nav'}>
          <Nav className={'mr-auto'}>
            <Link className={'nav-link'} to={'/'}>
              Projets
            </Link>
            <Link className={'nav-link'} to={'/'}>
              Clients
            </Link>
            <Link className={'nav-link'} to={'/'}>
              Coopérateurs
            </Link>
            <Link className={'nav-link'} to={'/'}>
              CRA
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;

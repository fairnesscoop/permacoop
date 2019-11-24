import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

const Menu: React.FC = () => {
  return (
    <>
      <Navbar bg={'light'} expand={'lg'} fixed={'top'}>
        <Link className={'navbar-brand'} to={'/'}>
          CoopERP
        </Link>
        <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
        <Navbar.Collapse id={'basic-navbar-nav'}>
          <Nav className={'mr-auto'}>
            <Link className={'nav-link'} to={'/'}>
              test
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;

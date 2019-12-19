import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from 'react-bootstrap';
import Menu from './Menu';

const Layout: React.FC = ({children}) => {
  return (
    <>
      <Menu />
      <Container>
        {/* Add 4.5rem to fix fixed navbar */}
        <div style={{marginTop: '4.5rem'}}>{children}</div>
      </Container>
      <Navbar>
        <Navbar.Collapse className={'justify-content-center center'}>
          <Navbar.Text>
            Copyright © {new Date().getFullYear()}{' '}
            <a href={'https://fairness.coop'} target={'_blank'}>
              fairness.coop
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Layout;

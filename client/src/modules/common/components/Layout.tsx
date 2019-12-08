import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Menu from './Menu';

const Layout: React.FC = ({children}) => {
  return (
    <>
      <Menu />
      <Container>
        {/* Add 5rem to fix fixed navbar */}
        <div style={{marginTop: '5rem'}}>{children}</div>
      </Container>
    </>
  );
};

export default Layout;

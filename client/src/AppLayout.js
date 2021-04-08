import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, Header } from './components';

const AppLayout = ({ children }) => (
  <main>
    <Header />
    <Container fluid className="app-container">
        {children}
    </Container>
    <Footer />
  </main>
);

export default AppLayout;

import React from 'react';
import NavigationBar from 'components/nav-bar';
import Footer from 'components/footer';

const AppLayout = ({ children }) => (
  <main>
    <NavigationBar />
    {children}
    <Footer />
  </main>
);

export default AppLayout;

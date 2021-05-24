import React from 'react';
import NavigationBar from 'components/nav-bar';
import Footer from 'components/footer';

const AppLayout = ({children}) => (
  <main>
    <NavigationBar/>
    <div className="app-layout">
      {children}
    </div>
    <Footer/>
  </main>
);

export default AppLayout;

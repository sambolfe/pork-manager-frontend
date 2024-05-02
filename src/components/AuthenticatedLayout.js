import React from 'react';
import Header from './Header';

const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;

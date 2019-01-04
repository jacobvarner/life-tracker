import React from 'react';

import { Link } from 'react-router-dom';
import Account from './Account';

const Header = () => (
  <header>
    <Link to="/">Home</Link>

    <nav />

    <Account />

    <hr />
  </header>
);

export default Header;

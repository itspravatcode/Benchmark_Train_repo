import { Routes, Route, Link } from "react-router";

import './style.css'

function Navbar() {
  return (
    <>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>

        <li>
          <Link to="/College">College</Link>
        </li>
      </ol>

    </>
  );
}

export default Navbar;

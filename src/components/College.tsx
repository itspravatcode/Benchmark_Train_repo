import { Link, NavLink, Outlet } from "react-router";
import "./style.css";

const College = () => {
  return (
    <>
      <h1>College</h1>
      <Link to="/">Go Back</Link>
      <div className="collage-link-container">
        <NavLink
          to="student"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Student
        </NavLink>
        <NavLink
          to="department"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Department
        </NavLink>
        <NavLink
          to="placements"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Placements
        </NavLink>

        
      </div>

      <Outlet></Outlet>
    </>
  );
};

export default College;

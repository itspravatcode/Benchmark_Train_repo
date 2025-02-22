import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import College from "./components/College.tsx";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Student from "./components/Student.tsx";
import Department from "./components/Department.tsx";
import Placements from "./components/Placements.tsx";
import Footer from "./components/Footer.tsx";
import MainLayout from "./components/MainLayout.tsx";

function App() {
  return (
    <>


      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/college" element={<College />}>
          <Route path="student" element={<Student />} />
          <Route path="department" element={<Department />} />
          <Route path="placements" element={<Placements />} />
        </Route>
      </Routes>


    </>
  );
}

export default App;

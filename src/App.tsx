import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/" style={{ color: "#0044cc", textDecoration: "none" }}>
          List
        </Link>
        <Link to="/gallery" style={{ color: "#0044cc", textDecoration: "none" }}>
          Gallery
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

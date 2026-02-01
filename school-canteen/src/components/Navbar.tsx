import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" style={{ marginRight: "10px" }}>Snacks</Link>
      <Link to="/students" style={{ marginRight: "10px" }}>Students</Link>
      <Link to="/create-student">Create Student</Link>
    </nav>
  );
}

export default Navbar;

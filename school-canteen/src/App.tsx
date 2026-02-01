import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import SnacksPage from "./pages/SnacksPage";
import StudentsPage from "./pages/StudentPage";
import StudentDetailPage from "./pages/StudentDetailsPage";
import CreateStudentPage from "./pages/CreateStudentPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SnacksPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/create-student" element={<CreateStudentPage />} />
      </Routes>
    </>
  );
}

export default App;

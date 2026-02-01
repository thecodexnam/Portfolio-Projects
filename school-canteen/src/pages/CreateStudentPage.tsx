import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function CreateStudentPage() {
  const { addStudent } = useAppContext();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Student name is required");
      return;
    }

    addStudent(name);
    alert("Student created successfully");
    setName("");
    navigate("/students");
  };

  return (
    <div>
      <h2>Create Student</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCreate}>Create Student</button>
    </div>
  );
}

export default CreateStudentPage;

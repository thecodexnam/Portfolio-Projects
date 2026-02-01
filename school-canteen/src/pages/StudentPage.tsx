import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function StudentsPage() {
  const { students } = useAppContext();

  return (
    <div>
      <h2>Students</h2>

      {students.length === 0 && (
        <p>No students found. Please create a student first.</p>
      )}

      {students.map(student => (
        <div
          key={student.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Referral Code:</strong> {student.referralCode}</p>
          <p><strong>Total Spent:</strong> ₹{student.totalSpent}</p>

          <Link to={`/students/${student.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default StudentsPage;

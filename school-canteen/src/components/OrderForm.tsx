import { useState } from "react";
import { useAppContext } from "../context/AppContext";

type Props = {
  snackId: number;
  onClose: () => void;
};

function OrderForm({ snackId, onClose }: Props) {
  const { students, placeOrder } = useAppContext();
  const [studentId, setStudentId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = () => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }
    placeOrder(studentId, snackId, quantity);
    onClose();
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
      <select onChange={e => setStudentId(Number(e.target.value))}>
        <option value="">Select Student</option>
        {students.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        max={5}
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>Place Order</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default OrderForm;

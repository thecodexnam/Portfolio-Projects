import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import OrderForm from "../components/OrderForm";
import { useState } from "react";

function StudentDetailPage() {
  const { id } = useParams();
  const { students, orders, snacks } = useAppContext();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const student = students.find(s => s.id === Number(id));

  if (!student) {
    return <p>Student not found</p>;
  }

  const studentOrders = orders.filter(
    order => order.studentId === student.id
  );

  return (
    <div>
      <h2>{student.name}</h2>
      <p><strong>Referral Code:</strong> {student.referralCode}</p>
      <p><strong>Total Spent:</strong> ₹{student.totalSpent}</p>

      <button onClick={() => setShowOrderForm(!showOrderForm)}>
        {showOrderForm ? "Cancel Order" : "Place New Order"}
      </button>

      {showOrderForm && (
        <div style={{ marginTop: "10px" }}>
          {snacks.map(snack => (
            <OrderForm
              key={snack.id}
              snackId={snack.id}
              onClose={() => setShowOrderForm(false)}
            />
          ))}
        </div>
      )}

      <h3>Order History</h3>

      {studentOrders.length === 0 && (
        <p>No orders placed yet.</p>
      )}

      {studentOrders.map(order => {
        const snack = snacks.find(s => s.id === order.snackId);

        return (
          <div key={order.id} style={{ marginBottom: "5px" }}>
            {snack?.name} × {order.quantity} = ₹{order.totalAmount}
            <br />
            <small>{order.date}</small>
          </div>
        );
      })}
    </div>
  );
}

export default StudentDetailPage;

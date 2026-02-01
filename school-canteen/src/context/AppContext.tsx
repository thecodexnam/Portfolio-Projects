import { createContext, useContext, useEffect, useState } from "react";
import { initialSnacks } from "../data/mockData";
import type { Snack, Student, Order } from "../data/mockData";

// 🔹 Context Type
type AppContextType = {
  snacks: Snack[];
  students: Student[];
  orders: Order[];
  addStudent: (name: string) => void;
  placeOrder: (studentId: number, snackId: number, quantity: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // 🔹 Load from localStorage or fallback
  const [snacks, setSnacks] = useState<Snack[]>(
    JSON.parse(localStorage.getItem("snacks") || "null") || initialSnacks
  );

  const [students, setStudents] = useState<Student[]>(
    JSON.parse(localStorage.getItem("students") || "[]")
  );

  const [orders, setOrders] = useState<Order[]>(
    JSON.parse(localStorage.getItem("orders") || "[]")
  );

  // 🔹 Save everything to localStorage
  useEffect(() => {
    localStorage.setItem("snacks", JSON.stringify(snacks));
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [snacks, students, orders]);

  // ✅ Add Student
  const addStudent = (name: string) => {
    setStudents([
      ...students,
      {
        id: Date.now(),
        name,
        referralCode: "REF" + Math.floor(Math.random() * 10000),
        totalSpent: 0
      }
    ]);
  };

  // ✅ Place Order
  const placeOrder = (studentId: number, snackId: number, quantity: number) => {
    const snack = snacks.find(snack => snack.id === snackId);
    if (!snack) return;

    const totalAmount = snack.price * quantity;

    // Add order
    setOrders([
      ...orders,
      {
        id: Date.now(),
        studentId,
        snackId,
        quantity,
        totalAmount,
        date: new Date().toLocaleString()
      }
    ]);

    // Update student spending
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, totalSpent: student.totalSpent + totalAmount }
        : student
    ));

    // Update snack order count
    setSnacks(snacks.map(sn =>
      sn.id === snackId
        ? { ...sn, ordersCount: sn.ordersCount + 1 }
        : sn
    ));
  };

  return (
    <AppContext.Provider
      value={{ snacks, students, orders, addStudent, placeOrder }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🔹 Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};

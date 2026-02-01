import { createContext, useContext, useEffect, useState } from "react";
import type { Snack, Student, Order } from "../data/mockData";
import { initialSnacks } from "../data/mockData";

type AppContextType = {
  snacks: Snack[];
  students: Student[];
  orders: Order[];
  addStudent: (name: string) => void;
  placeOrder: (studentId: number, snackId: number, quantity: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

// 🔹 Helper functions (simple & readable)
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // 🔹 Load initial data from localStorage
  const [snacks, setSnacks] = useState<Snack[]>(
    () => getFromStorage("snacks", initialSnacks)
  );

  const [students, setStudents] = useState<Student[]>(
    () => getFromStorage("students", [])
  );

  const [orders, setOrders] = useState<Order[]>(
    () => getFromStorage("orders", [])
  );

  // 🔹 Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("snacks", JSON.stringify(snacks));
  }, [snacks]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ Add Student
  const addStudent = (name: string) => {
    const newStudent: Student = {
      id: Date.now(),
      name,
      referralCode: "REF" + Math.floor(Math.random() * 10000),
      totalSpent: 0
    };

    setStudents(prev => [...prev, newStudent]);
  };

  // ✅ Place Order
  const placeOrder = (studentId: number, snackId: number, quantity: number) => {
    const snack = snacks.find(s => s.id === snackId);
    if (!snack) return;

    const totalAmount = snack.price * quantity;

    const newOrder: Order = {
      id: Date.now(),
      studentId,
      snackId,
      quantity,
      totalAmount,
      date: new Date().toLocaleString()
    };

    // Save order
    setOrders(prev => [...prev, newOrder]);

    // Update student spending
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, totalSpent: student.totalSpent + totalAmount }
          : student
      )
    );

    // Update snack order count
    setSnacks(prev =>
      prev.map(sn =>
        sn.id === snackId
          ? { ...sn, ordersCount: sn.ordersCount + 1 }
          : sn
      )
    );
  };

  return (
    <AppContext.Provider
      value={{ snacks, students, orders, addStudent, placeOrder }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};

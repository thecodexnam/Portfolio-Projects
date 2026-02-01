export type Snack = {
  id: number;
  name: string;
  price: number;
  ordersCount: number;
};

export type Student = {
  id: number;
  name: string;
  referralCode: string;
  totalSpent: number;
};

export type Order = {
  id: number;
  studentId: number;
  snackId: number;
  quantity: number;
  totalAmount: number;
  date: string;
};

export const initialSnacks: Snack[] = [
  { id: 1, name: "Samosa", price: 10, ordersCount: 0 },
  { id: 2, name: "Sandwich", price: 30, ordersCount: 0 },
  { id: 3, name: "Juice", price: 20, ordersCount: 0 },
  { id: 4, name: "Chocolate", price: 15, ordersCount: 0 }
];

import type { Snack } from "../data/mockData";

type Props = {
  snack: Snack;
  onOrder: () => void;
};

function SnackCard({ snack, onOrder }: Props) {
  return (
    <div className="snackcard">
      <h3>{snack.name}</h3>
      <p>Price: ₹{snack.price}</p>
      <p>Ordered: {snack.ordersCount} times</p>
      <button onClick={onOrder}>Order</button>
    </div>
  );
}

export default SnackCard;

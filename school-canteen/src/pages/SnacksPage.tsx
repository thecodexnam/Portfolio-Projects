import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import SnackCard from "../components/SnackCard";
import OrderForm from "../components/OrderForm";

function SnacksPage() {
  const { snacks, students } = useAppContext();
  const [activeSnackId, setActiveSnackId] = useState<number | null>(null);

  return (
    <div>
      <h2>Snacks</h2>

      {/* If no students exist */}
      {students.length === 0 && (
        <p>Please create a student before placing an order.</p>
      )}

      {snacks.map(snack => (
        <div key={snack.id}>
          <SnackCard
            snack={snack}
            onOrder={() => setActiveSnackId(snack.id)}
          />

          {/* Order form opens only for selected snack */}
          {activeSnackId === snack.id && students.length > 0 && (
            <OrderForm
              snackId={snack.id}
              onClose={() => setActiveSnackId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SnacksPage;

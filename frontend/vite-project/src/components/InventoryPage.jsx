import { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import InventoryTable from "./InventoryTable";

export default function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Add Item</h5>
          <AddItemForm items={items} setItems={setItems} />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Inventory</h5>
          <InventoryTable items={items} setItems={setItems} />
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import InventoryTable from "./InventoryTable";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);


  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(search.toLowerCase()) ||item.category.toLowerCase().includes(search.toLowerCase())
  );


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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Inventory</h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search item..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <InventoryTable items={filteredItems} setItems={setItems} />

        </div>
      </div>
    </>
  );
}

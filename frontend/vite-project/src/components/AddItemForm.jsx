import { useState } from "react";

export default function AddItemForm({ items, setItems }) {
  const [item, setItem] = useState({
    itemName: "",
    category: "",
    quantity: ""
  });

   const [error, setError] = useState("");

  const addItem = async () => {
    if (!item.itemName.trim()) {
      setError("Item Name is required");
      return;
    }

    if (!item.category.trim()) {
      setError("Category is required");
      return;
    }

    if (item.quantity === "" || item.quantity < 0) {
      setError("Quantity is required and cannot be negative");
      return;
    }

    setError("");

    const response = await fetch("http://localhost:8080/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    const savedItem = await response.json();

    setItems(prev => [...prev, savedItem]);

    setItem({ itemName: "", category: "", quantity: "" });
  };

  return (
    <>
{/*        */}
{/*       {error && ( */}
{/*         <div className="alert alert-danger py-2 mb-3"> */}
{/*           {error} */}
{/*         </div> */}
{/*       )} */}

      <div className="row g-2">

        <div className="col-md-4">
          <input
            className={`form-control ${
              error && !item.itemName ? "is-invalid" : ""
            }`}
            placeholder="Item Name"
            value={item.itemName}
            onChange={e =>
              setItem({ ...item, itemName: e.target.value })
            }
          />
        </div>


        <div className="col-md-4">
          <input
            className={`form-control ${
              error && !item.category ? "is-invalid" : ""
            }`}
            placeholder="Category"
            value={item.category}
            onChange={e =>
              setItem({ ...item, category: e.target.value })
            }
          />
        </div>


        <div className="col-md-2">
          <input
            type="number"
            className={`form-control ${
              error &&
              (item.quantity === "" || item.quantity < 0)
                ? "is-invalid"
                : ""
            }`}
            placeholder="Quantity"
            value={item.quantity}
            onChange={e =>
              setItem({ ...item, quantity: e.target.value })
            }
          />
        </div>

        {/* Add Button */}
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={addItem}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

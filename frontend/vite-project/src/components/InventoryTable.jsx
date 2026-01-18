import { useEffect, useState } from "react";

export default function InventoryTable({ items, setItems }) {

  const updateStock = async (item, change) => {
    if (item.quantity + change < 0) return;

    const response = await fetch(
      `http://localhost:8080/api/items/${item.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          quantity: item.quantity + change
        })
      }
    );


    const updatedFromBackend = await response.json();

    setItems(prev =>
      prev.map(i =>
        i.id === updatedFromBackend.id ? updatedFromBackend : i
      )
    );
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:8080/api/items/${id}`, {
      method: "DELETE"
    });

    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <table className="table table-bordered table-hover text-center inventory-table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "LOW_STOCK"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success me-1"
                  onClick={() => updateStock(item, 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => updateStock(item, -1)}
                >
                  -
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

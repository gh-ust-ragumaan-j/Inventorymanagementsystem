import InventoryPage from "./components/InventoryPage";
import "./App.css";

function App() {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#f5f7fa", minHeight: "70vh" }}
    >
      <div
        className="mt-4 mb-4"
        style={{
          width: "100%",
          maxWidth: "900px",
          border: "1px solid #dee2e6",
          backgroundColor: "#CBC3E3",
          borderRadius: "10px",
          padding: "20px"
        }}
      >
        <h2 className="text-center mb-4">
          Inventory Management System  <i className="fa-solid fa-chart-column"></i>

        </h2>


        <InventoryPage />
      </div>
    </div>
  );
}

export default App;

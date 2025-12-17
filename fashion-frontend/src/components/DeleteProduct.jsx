import { useState } from "react";
import api from "../api";
import "./DeleteProduct.css";  

export default function DeleteProduct() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleDelete = async () => {
    if (!name.trim()) {
      setMsg("Please enter product name");
      return;
    }

    try {
      const res = await api.post("/delete-product", {
        "Product Name": name
      });

      setMsg(res.data.message);
      setName("");

    } catch (err) {
      setMsg(" Error deleting product");
    }
  };

  return (
    <div className="delete-card">
      <h2 className="delete-title"> Delete Product</h2>

      {msg && <p className="delete-message">{msg}</p>}

      <div className="form-group-del">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className="delete-btn" onClick={handleDelete}>
        Delete Product
      </button>
    </div>
  );
}

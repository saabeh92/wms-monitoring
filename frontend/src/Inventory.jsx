import { useState, useEffect } from "react";
import axios from "axios";
import InventoryChart from "./InventoryChart";
import "./App.css";

function Inventory() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchItems = () => {
    axios.get("http://127.0.0.1:8000/inventory")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = () => {
    if (editingId === null) {
      const id = Math.floor(Math.random() * 100000);
      axios.post("http://127.0.0.1:8000/inventory", { id, name, quantity: parseInt(quantity) })
        .then(() => { fetchItems(); setName(""); setQuantity(""); });
    } else {
      axios.put(`http://127.0.0.1:8000/inventory/${editingId}`, { id: editingId, name, quantity: parseInt(quantity) })
        .then(() => { fetchItems(); setName(""); setQuantity(""); setEditingId(null); });
    }
  };

  const handleEdit = (item) => { setName(item.name); setQuantity(item.quantity); setEditingId(item.id); };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://127.0.0.1:8000/inventory/${id}`)
        .then(() => fetchItems());
    }
  };

  const handleExport = () => {
    const csv = [
      ["ID","Name","Quantity"],
      ...items.map(i => [i.id, i.name, i.quantity])
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "inventory.csv"; a.click();
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const totalStock = filteredItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Warehouse Inventory</h2>
      <p>Total Stock: {totalStock}</p>

      <input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="form-container">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button onClick={handleSubmit}>{editingId === null ? "Add Item" : "Update Item"}</button>
        <button onClick={handleExport}>Export CSV</button>
      </div>

      <InventoryChart items={filteredItems} />

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Quantity</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td className={item.quantity < 5 ? "low-stock" : ""}>{item.quantity}</td>
              <td className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

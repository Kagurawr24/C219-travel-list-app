import { useState } from "react";

export default function PackingList({ items, togglePacked, updateQuantity, deleteItem }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default"); // New state for sorting
  
    // Handle sorting logic
    const sortedItems = [...items].sort((a, b) => {
      if (sortBy === "packed") {
        return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
      } else if (sortBy === "unpacked") {
        return a.packed === b.packed ? 0 : a.packed ? -1 : 1;
      }
      return 0;
    });
  
    // Apply search filter
    const filteredItems = sortedItems.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="list">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="sort-button"
            onClick={() =>
              setSortBy((prev) =>
                prev === "default"
                  ? "packed"
                  : prev === "packed"
                  ? "unpacked"
                  : "default"
              )
            }
          >
            Sort: {sortBy === "default" ? "Default" : sortBy === "packed" ? "Packed First" : "Unpacked First"}
          </button>
        </div>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                togglePacked={togglePacked}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function Item({ item, togglePacked, updateQuantity, deleteItem }) {
    return (
      <div className={`item ${item.packed ? "packed" : ""}`}>
        <label>
          {/* Controlled checkbox */}
          <input
            type="checkbox"
            checked={item.packed}  // Controlled by the 'packed' status
            onChange={() => togglePacked(item.id)}  // Call the function when the checkbox state changes
          />
          <span
            style={{
              textDecoration: item.packed ? "line-through" : "none",  // Strike-through if packed
            }}
          >
            {item.description} {/* Item description */}
          </span>
        </label>
        <select
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
        >
          {[...Array(11).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        <button
          className="delete-button"
          onClick={() => deleteItem(item.id)}
          aria-label="Delete item"
        >
          🗑️
        </button>
      </div>
    );
  }
import { useState } from "react";

export default function Form({ handleAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    function handleSubmit(e) {
      e.preventDefault();
      if (description) {
        const newItem = {
          id: Date.now(),
          description: description,
          quantity: quantity,
          packed: false,
        };
        handleAddItem(newItem);
        setDescription("");
        setQuantity(1);
      }
    }
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[...Array(11).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  }  
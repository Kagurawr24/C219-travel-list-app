export default function Stats({ items }) {
    // 1. Get the number of packed items
    const packedItems = items.filter((item) => item.packed).length;
    
    // 2. Derive the packed percentage
    const totalItems = items.length;
    const packedPercentage =
      totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  
    return (
      <footer className="stats">
        {/* 3. Conditionally render the message */}
        <em>
          {packedPercentage === 100
            ? "You got everything!" // Display when packed is 100%
            : `You have ${totalItems} items in the list. You already packed ${packedItems} (${packedPercentage}%).`}
        </em>
        <div className="progress-bar">
          <div style={{ width: `${packedPercentage}%` }}></div>
        </div>
      </footer>
    );
  }
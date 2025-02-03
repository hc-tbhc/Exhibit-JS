import React from "react";

function SavedItems({ items, onRemove }) {
  return (
    <div>
      <h2>Saved Items</h2>
      {items.length === 0 ? (
        <p>No saved items yet</p>
      ) : (
        <div className="saved-items">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.attributes.summary.title}</h3>
              <p>{item.attributes.description[0].value || "No description available."}</p>
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItems;
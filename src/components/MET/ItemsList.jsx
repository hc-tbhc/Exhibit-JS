import React, { useState } from "react";
import { Link } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";
import METLOGO from "../../assets/METLOGO.png";

function ItemsList({ items = [], onSave }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = items && items.length > 0 ? Math.ceil(items.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items ? items.slice(startIndex, startIndex + itemsPerPage) : [];

  return (
    <div className="items-list">
      {items ? (
        displayedItems.map((item) => (
          <ItemCard key={item.id || item.objectID} item={item} onSave={onSave} />
        ))
      ) : (
        <h2>No results found</h2>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <img src={METLOGO} alt="The Metropolitan Museum of Art" className="MET-footer"/>
    </div>
  );
}

function ItemCard({ item, onSave }) {
  const thumbnail = item.primaryImageSmall || item.primaryImage || null;
  const name = item.title || "Name not found";
  const description = item.objectName || null;

  console.log(item)

  return (
    <div className="item-card">
      <Link to={`/MET/item/${item.objectID}`} state={{ item }}>
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="item-thumbnail" />
        ) : (
          <img src={img_not_found} alt="No image found" className="item-thumbnail"/>
        )}
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
      <button onClick={() => onSave(item)}>Save</button>
    </div>
  );
}

export default ItemsList;

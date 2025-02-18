import React, { useState } from "react";
import { Link } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";
import SMGLogo from "../../assets/SMGLogoColour.jpg";

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
            Back
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <img src={SMGLogo} alt="The Metropolitan Museum of Art" className="SMG-footer"/>
    </div>
  );
}

function ItemCard({ item, onSave }) {
  const thumbnail =
    item.attributes?.multimedia?.[0]?.["@processed"]?.medium_thumbnail?.location;
  const name =
    typeof item.attributes.summary.title === "string"
      ? item.attributes.summary.title
      : "Name not found";
  const description =
    typeof item.attributes.description?.[0]?.value === "string"
      ? item.attributes.description?.[0].value
      : "Description not found";

  return (
    <div className="item-card">
      <Link to={`/SMG/item/${item.id}`} state={{ item }}>
        {thumbnail ? (
          <img
            src={"https://coimages.sciencemuseumgroup.org.uk/" + thumbnail}
            alt={name}
            className="item-thumbnail"
          />
        ) : (
          <img className="item-thumbnail" src={img_not_found} alt="No image found" />
        )}
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
      <button onClick={() => onSave(item)}>Save</button>
    </div>
  );
}

export default ItemsList;
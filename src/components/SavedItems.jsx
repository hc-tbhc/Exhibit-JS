import React, { useState } from "react";
import { Link } from "react-router";
import "../SavedItems.css";
import img_not_found from "../assets/img-not-found.jpg";
import SMGLogo from "../assets/SMGLogoColour.jpg";
import METLOGO from "../assets/METLOGO.png";

function SavedItems({ items = [], onRemove }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = items.length > 0 ? Math.ceil(items.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2 className="header">Library</h2>
      {items.length === 0 ? (
        <p className="fallback">No saved items yet</p>
      ) : (
        <>
          <div className="saved-items">
            {displayedItems.map((item) => (
              <div key={item.id || item.objectID} className="item-card">
                {item.attributes ? (
                  <Link to={`/SMG/item/${item.id}`} state={{ item }}>
                    <img
                      className="item-thumbnail"
                      src={
                        "https://coimages.sciencemuseumgroup.org.uk/" +
                        item.attributes?.multimedia?.[0]?.["@processed"]?.medium_thumbnail?.location
                      }
                      alt={item.attributes?.summary?.title}
                    />
                    <h3>{item.attributes?.summary?.title}</h3>
                    <p>{item.attributes?.description?.[0]?.value}</p>
                    <img src={SMGLogo} alt="Science Museum Group" className="museum-card-icon" />
                  </Link>
                ) : (
                  <Link to={`/MET/item/${item.objectID}`} state={{ item }}>
                    <img
                      className="item-thumbnail"
                      src={item.primaryImageSmall || item.primaryImage || img_not_found}
                      alt={item.title}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.objectName}</p>
                    <img src={METLOGO} alt="The Metropolitan Museum of Art" className="museum-card-icon" />
                  </Link>
                )}
                <button onClick={() => onRemove(item.id || item.objectID)}>Remove</button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Back</button>
              <span> Page {currentPage} of {totalPages} </span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SavedItems;

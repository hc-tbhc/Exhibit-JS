import React from "react";
import { Link } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";

function ItemsList({ items, onSave }) {
  return (
    <div className="items-list">
      {items ? (
        items.map((item) => (
          <ItemCard key={item.id || item.objectID} item={item} onSave={onSave} />
        ))
      ) : (
        <h2>No items found</h2>
      )}
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
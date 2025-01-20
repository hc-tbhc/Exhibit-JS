import React from "react";
import { Link } from "react-router";
import img_not_found from "../assets/img-not-found.jpg"

// function ItemsList ({ items, onSave }) {
//   return (
//     <div className="items-list">
//       {items.map((item) => (
//         <ItemCard key={item.id} item={item} onSave={onSave} />
//       ))}
//     </div>
//   );
// };

function ItemsList ({ items, onSave }) {
  return (
    <div className="items-list">
      {items ? (
        items.map((item) => (
        <ItemCard key={item.id} item={item} onSave={onSave} />
      ))) : (
      <h2>No items found</h2>
      )}
    </div>
  );
};

function ItemCard({ item, onSave }) {
  let thumbnail = item.attributes?.multimedia?.[0]?.["@processed"]?.medium_thumbnail?.location;

  const name = typeof item.attributes.summary.title === "string" ? item.attributes.summary.title : "Name not found";
  const description = typeof item.attributes.description[0].value === "string" ? item.attributes.description[0].value : "Description not found";

  // console.log(item.id)

  return (
    <div className="item-card">
      <Link to={`/item`} className="item-link">
      {thumbnail ? (
        <img src={'https://coimages.sciencemuseumgroup.org.uk/' + thumbnail} alt={name} className="item-thumbnail" />
      ) : (
        <img className="item-thumbnail" src={img_not_found} alt="No image found"></img>
      )}
      <h3>{name}</h3>
      </Link>
      <p>{description}</p>
      <button onClick={() => onSave(item)}>Save</button>
    </div>
  );
};

export default ItemsList;
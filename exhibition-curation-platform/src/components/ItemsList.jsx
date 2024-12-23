import React from "react";
import img_not_found from "../assets/Image-not-found.png"

function ItemsList ({ items, onSave }) {
  return (
    <div className="items-list">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onSave={onSave} />
      ))}
    </div>
  );
};

const ItemCard = ({ item, onSave }) => {
  let thumbnail = item.attributes?.multimedia?.[0]?.["@processed"]?.medium_thumbnail?.location;

  const name = typeof item.attributes.summary.title === "string" ? item.attributes.summary.title : "Name not found";
  const description = typeof item.attributes.description[0].value === "string" ? item.attributes.description[0].value : "Description not found";

  return (
    <div className="item-card">
      {thumbnail ? (
        <img src={'https://coimages.sciencemuseumgroup.org.uk/' + thumbnail} alt={name} className="item-thumbnail" />
      ) : (
        <img className="item-thumbnail" src={img_not_found} alt="No image found"></img>
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={() => onSave(item)}>Save</button>
    </div>
  );
};

export default ItemsList;
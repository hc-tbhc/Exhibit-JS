import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
// import ""

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log(id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://collection.sciencemuseumgroup.org.uk/objects/${id}`
        );
        const data = await response.json();
        setItem(data.data);
      } catch (err) {
        setError("Error fetching item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
}, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!item) {
    return <div className="error">Item not found</div>;
  }

  return (
    <div className="item-page">
      <h2>{item.attributes.summary.title}</h2>
      {console.log()}
      {item.attributes.multimedia?.[0]?.["@processed"]?.large_thumbnail?.location ? (
        <img
          className="item-image"
          src={item.attributes?.multimedia?.[0]?.["@processed"]?.large_thumbnail?.location}
          alt={item.attributes.summary.title || "Item Image"}
        />
      ) : (
        <div className="item-placeholder">No Image Available</div>
      )}
      <p>{item.attributes.description[0].value || "No description available."}</p>
      <Link to="/" className="back-button">Back to Search</Link>
    </div>
  );
};

export default ItemPage;
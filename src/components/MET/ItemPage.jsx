import { useLocation } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";
import "../../ItemPage.css";

function ItemPage() {
  const { state } = useLocation();
  const { item } = state || {};

  if (!item) {
    return <div>Item not available</div>;
  }

  const name = item.title || null;
  const description = item.objectDate ? `Date: ${item.objectDate}` : null;
  const artist = item.artistDisplayName || "Artist unknown";
  const credit = item.creditLine || null;
  const thumbnail = item.primaryImage || item.primaryImageSmall;

  return (
    <div className="item-page">
      {thumbnail ? (
        <img src={thumbnail} alt={name} />
      ) : (
        <img src={img_not_found} alt="No image found" />
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Artist: {artist}</p>
      {credit && <p>Credit: {credit}</p>}
    </div>
  );
}

export default ItemPage;
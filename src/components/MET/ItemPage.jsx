import { useLocation } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";
import METLOGO from "../../assets/METLOGO.png";
import "../../ItemPage.css";

function ItemPage({ onSave }) {
  const { state } = useLocation();
  const { item } = state || {};

  if (!item) {
    return <div>Item not available</div>;
  }

  const name = item.title || null;
  const date = item.objectDate ? `Date: ${item.objectDate}` : null;
  const artist = item.artistDisplayName ? 'By: ' + item.artistDisplayName : 'By: Artist unknown';
  const credit = item.creditLine ? 'Credit: ' + item.creditLine : null;
  const thumbnail = item.primaryImage || item.primaryImageSmall;
  const dimensions = item.dimensions ? 'Dimensions: ' + item.dimensions : null;

  // artist data

  const birth = item.artistBeginDate ? 'Born: ' + item.artistBeginDate : 'Born: Unavailable';
  const death = item.artistEndDate ? 'Death: ' + item.artistEndDate : 'Death: Unavailable';
  const gender = item.gender ? 'Gender: ' + item.gender : 'Gender: Unavailable';
  const nationality = item.nationality ? 'Nationality: ' + item.nationality : 'Nationality: Unavailable';

  return (
    <div className="item-page">
      {thumbnail ? (
        <img src={thumbnail} alt={name} className="item-image" />
      ) : (
        <img src={img_not_found} alt="No image found" className="item-image"  />
      )}
      <h2>{name}</h2>
      <p>{artist}</p>
      <div className="artist-data">
        <ul>
          <li>{birth}</li>
          <li>{death}</li>
          <li>{gender}</li>
          <li>{nationality}</li>
        </ul> 
      </div>
      <p>{date}</p>
      <p>{dimensions}</p>
      <p>{credit}</p>
      <button onClick={() => onSave(item)} className="save-button">Save</button>
    </div>
  );
}

export default ItemPage;
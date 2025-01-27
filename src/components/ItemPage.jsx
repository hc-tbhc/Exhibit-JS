import { useLocation } from "react-router";
import img_not_found from "../assets/img-not-found.jpg";

function ItemPage() {
  const { state } = useLocation();
  const { item } = state || {};
  
  if (!item) {
    return <div>Item not available</div>;
  }

  console.log(item)

  const name =
    typeof item.attributes.summary.title === "string"
      ? item.attributes.summary.title
      : "Name not found";
  
  const description =
    typeof item.attributes.description[0]?.value === "string"
      ? item.attributes.description[0].value
      : "Description not found";

  const thumbnail = item.attributes?.multimedia?.[0]?.["@processed"]?.large?.location;

  return (
    <div className="item-page">
        {thumbnail ? (
          <img
            src={"https://coimages.sciencemuseumgroup.org.uk/" + thumbnail}
            alt={name}
          />
        ) : (
          <img src={img_not_found} alt="No image found" />
        )}
        <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ItemPage;
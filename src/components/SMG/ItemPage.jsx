import { useLocation } from "react-router";
import img_not_found from "../../assets/img-not-found.jpg";
import '../../ItemPage.css' 

function ItemPage({ onSave }) {
  const { state } = useLocation();
  const { item } = state || {};
  
  if (!item) {
    return <div>Item not available</div>;
  }

  const name =
    typeof item.attributes.summary.title === "string"
      ? item.attributes.summary.title
      : "Name not found";
      
  const image = item.attributes?.multimedia?.[0]?.["@processed"]?.large?.location;

  const description =
    typeof item.attributes.description[1]?.value === "string"
      ? item.attributes.description[1].value
      : item.attributes.description[0].value || null;

  const maker =
    typeof item.attributes.creation?.maker?.[0].summary.title === "string"
      ? 'Maker: ' + item.attributes.creation.maker[0].summary.title
      : null;
  
  const credit = 
    typeof item.attributes.legal?.credit === "string"
      ? 'Credit: ' + item.attributes.legal.credit
      : null;

  const dimensions =
    typeof item.attributes.measurements?.dimensions?.[0].value === 'string'
      ? 'Dimensions: ' + item.attributes.measurements.dimensions[0].value
      : null;

  console.log(item.attributes.measurements?.dimensions?.[0].value);

  // people

  const birth = 
    typeof item.attributes.birth?.date?.from === 'string'
      ? 'Born: ' + item.attributes.birth.date.from
      : null;
  
  const birthplace = 
    typeof item.attributes.birth?.location?.name[0]?.value === 'string'
      ? 'Birthplace: ' + item.attributes.birth.location.name[0]?.value
      : null;

  const death =
    typeof item.attributes.death?.date?.from === 'string'
      ? 'Death: ' + item.attributes.death.date.from
      : null;

  const placeOfDeath =
    typeof item.attributes.death?.location?.name[0]?.value === 'string'
      ? 'Place of death: ' + item.attributes.death.location.name[0]?.value
      : null;

  const gender =
    typeof item.attributes.gender?.value === 'string'
      ? 'Gender: ' + item.attributes.gender.value
      : null;

  const nationality =
    typeof item.attributes.nationality?.[0]
      ? 'Nationality: ' + item.attributes.nationality?.[0]
      : null;
  
  const occupation =
    typeof item.attributes.occupation?.value === 'string'
      ? 'Occupation(s): ' + item.attributes.occupation.value.join(', ')
      : null;

  if (item.type === 'objects') {
    return (
      <div className="item-page">
        {image ? (
          <img src={"https://coimages.sciencemuseumgroup.org.uk/" + image} alt={name} className="item-image"/>
        ) : (
          <img src={img_not_found} alt="No image found" className="item-image"/>
        )}
        <h2>{name}</h2>
        <div>
          <div className="description">
            <p>{description}</p>
          </div>
          <p>{maker}</p>
          <p>{dimensions}</p>
          <p>{credit}</p>
        </div>
        <button onClick={() => onSave(item)} className="save-button">Save</button>
      </div>
    );
  }

  if (item.type === 'people') {
    return (
      <div className="item-page">
        {image ? (
          <img src={"https://coimages.sciencemuseumgroup.org.uk/" + image} alt={name} className="item-image"/>
        ) : (
          <img src={img_not_found} alt="No image found" />
        )}
        <h3>{name}</h3>
        <div className="description">
          <p>{description}</p>
        </div>
        <p>{birth}</p>
        <p>{birthplace}</p>
        <p>{death}</p>
        <p>{placeOfDeath}</p>
        <p>{gender}</p>
        <p>{nationality}</p>
        <p>{occupation}</p>
        <button onClick={() => onSave(item)} className="save-button">Save</button>
      </div>
    );
  }

  if (item.type === 'documents') {
    return (
      <div className="item-page">
        {image ? (
          <img src={"https://coimages.sciencemuseumgroup.org.uk/" + image} alt={name} className="item-image"/>
        ) : (
          <img src={img_not_found} alt="No image found" className="item-image"/>
        )}
        <h3>{name}</h3>
        <div className="description">
          <p>{description}</p>
        </div>
        <button onClick={() => onSave(item)} className="save-button">Save</button>
      </div>
    );
  }
}

export default ItemPage;
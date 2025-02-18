import { useNavigate } from "react-router";
import SMGLogo from "./assets/SMGLogoColour.jpg";
import METLOGO from "./assets/METLOGO.png"

function LandingPage({ resetSearchResults }) {
  const navigate = useNavigate();

  const handleCollectionSelect = (collection) => {
    resetSearchResults();
    navigate(`/${collection}`);
  };

  return (
    <div className="landing">
      <header className="tagline">
        <h2>Browse collections from all over the world</h2>
      </header>
      <h3>Select a collection:</h3>
      <div className="museums">
        <div className="SMG">
          <img
            src={SMGLogo}
            onClick={() => handleCollectionSelect("SMG")}
            alt="Science Museum Group"
          />
        </div>
        <div className="MET">
          <img
            src={METLOGO}
            onClick={() => handleCollectionSelect("MET")}
            alt="The Metropolitan Museum of Art"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
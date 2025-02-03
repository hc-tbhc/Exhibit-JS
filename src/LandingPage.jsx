import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h2>Select a collection:</h2>
      <div className="museums">
        <button onClick={() => navigate("/SMG")}>Science Museum Group</button>
        <button onClick={() => navigate("/MET")}>The MET Collection</button>
      </div>
    </div>
  );
}

export default LandingPage;
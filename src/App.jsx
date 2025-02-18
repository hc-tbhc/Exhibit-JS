import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import SearchPageSMG from "./components/SMG/SearchPage";
import SearchPageMET from "./components/MET/SearchPage";
import SavedItems from "./components/SavedItems";
import ItemPageSMG from "./components/SMG/ItemPage";
import ItemPageMET from "./components/MET/ItemPage";
import LandingPage from "./LandingPage";
import "./App.css";

function App() {
  const [savedItems, setSavedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notification, setNotification] = useState(null);

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const saveItem = (item) => {
    const itemId = item.id || item.objectID; 
    if (!savedItems.some((saved) => saved.id === itemId)) {
      setSavedItems((prev) => [...prev, { ...item, id: itemId }]);
      showNotification("Saved");
    }
  };

  const removeSavedItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showNotification("Removed from library");
  };

  return (
    <Router>
      <header>
        <h1>
          <Link to="/" className="exhibit">Exhibit </Link>
          <Link to="/" className="js">JS</Link>
        </h1>
        <nav>
          <Link to="/saved">Library</Link>
        </nav>
      </header>
      <main>
        {notification && <div className="notification">{notification}</div>}
        <Routes>
          <Route path="/" element={<LandingPage resetSearchResults={resetSearchResults} />} />
          <Route
            path="/SMG"
            element={
              <SearchPageSMG
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onSave={saveItem}
              />
            }
          />
          <Route path="/SMG/item/:id" element={<ItemPageSMG onSave={saveItem} />} />
          <Route
            path="/MET"
            element={
              <SearchPageMET
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onSave={saveItem}
              />
            }
          />
          <Route path="/MET/item/:id" element={<ItemPageMET onSave={saveItem} />} />
          <Route path="/saved" element={<SavedItems items={savedItems} onRemove={removeSavedItem} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

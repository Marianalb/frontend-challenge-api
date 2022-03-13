import Feed from '../feed/Feed';
import PostDetails from '../post-details/PostDetails';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

/**
 * Root component
 */
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Feed/>}/>
            <Route path="/post-details/:postId" element={<PostDetails/>}/>
        </Routes>
      </Router>   
    </div>
  );
}

export default App;

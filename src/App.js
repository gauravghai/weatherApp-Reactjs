import React from "react";
import CurrentLocation from "./CurrentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">Download Source Code</a>
        <span> | Developed by </span>
        <a target="_blank" rel="noopener noreferrer" href="https://www.gauravghai.dev/">
          Gaurav Ghai
        </a>
        <span> | Powered by </span>
        <a target="_blank" rel="noopener noreferrer" href="https://www.htmlhints.com/">
          HTML HINTS
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;

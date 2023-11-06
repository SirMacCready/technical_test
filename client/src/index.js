import React from "react";
import ReactDOM from "react-dom/client";
import DataDisplay from './DataDisplay.js';
function App() {
  return (
    <div className="App">
      <DataDisplay />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
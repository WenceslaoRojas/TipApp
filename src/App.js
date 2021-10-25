import React from "react";
import appStyle from "./app.module.css";
import TipContainer from "./Componentes/TipContainer/TipContainer";

function App() {
  return (
    <div className={appStyle.appContainer}>
      <div className={appStyle.divsContainer}>
        <TipContainer />
      </div>
    </div>
  );
}

export default App;

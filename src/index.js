import react from "react";
import reactDom from "react-dom";
import "./index.css"
import logo from "./logo.png"


const container = document.getElementById("root");

const App = () => 
(
    <div className="app">
        <h1>Hola React!</h1>
        <img src={logo} />
    </div>
)


reactDom.render(<App/>, container);



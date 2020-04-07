import React from "react";
import ReactDOM from "react-dom";
import HackerNews from "./HackerNews";
import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div className="App">
          <HackerNews/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

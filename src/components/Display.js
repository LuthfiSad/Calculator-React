import React from "react";

const Display = ({ input, output }) => (
    <div className="output">
      <div className="result">{output}</div>
      <div id="display" className="input">{input}</div>
    </div>
  );

  export default Display;
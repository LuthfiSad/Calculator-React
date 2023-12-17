import React from "react";
import Key from "./Key";
import { calcData } from "../data";

const Keyboard = ({ handleInput }) => (
    <div className="keys">
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  );

  export default Keyboard;
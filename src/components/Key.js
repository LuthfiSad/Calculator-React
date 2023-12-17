import React from "react";

const Key = ({ keyData: { id, value, type }, handleInput }) => (
    <button id={id} className={type} onClick={() => handleInput(value)}>
      {value}
    </button>
  );

  export default Key;
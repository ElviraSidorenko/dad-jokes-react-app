import React, { useState } from "react";

const Form = ({ onNewJoke }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onNewJoke(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your joke here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;

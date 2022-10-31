import React from "react";

function AddSubtitle(props) {
  // const [description, setDescription] = props.state;
  return (
    <div>
      <input
        type="text"
        id={props.description}
        name="subtitle"
        value={props.description}
        placeholder="Enter your subtitle"
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default AddSubtitle;

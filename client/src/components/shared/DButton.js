import React from "react";

/**
 * Saves me from writing type button over and over.
 *
 * @param {{text: string, func: () => {}}} props
 */
function DButton({ text, func }) {
  return (
    <button type="button" onClick={func}>
      {text}
    </button>
  );
}

export default DButton;

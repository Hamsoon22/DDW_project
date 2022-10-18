import React, { useState } from "react";
import { getImage } from "../../backend/app.service";

export function FutureSessionResults({ futureAnswers, anchor }) {
  const promptText = futureAnswers?.join(" ") + "in future";

  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    getImage(promptText).then((data) => {
      setImageUrl(`http://localhost:4000/${data}`);
    });
  };

  return (
    <section className="fullpage-center" id={anchor}>
      <div className="future">
        <h1>
          This is your future image based on your anwser..
          <div className="future-image-result"></div>
          {promptText}
          <br></br>
          <button onClick={handleClick}>Show image</button>
          <br></br>
          <img id="image" src={imageUrl} crossOrigin="anonymous" />
        </h1>
      </div>
    </section>
  );
}

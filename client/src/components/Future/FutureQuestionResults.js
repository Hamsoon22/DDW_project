import React, { useState } from "react";
import { getImage } from "../../backend/app.service";

export function FutureSessionResults({ futureAnswers, anchor }) {
  const promptText = futureAnswers?.join(" ") + "colorful" +  " " + "futuristic";

  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    getImage(promptText).then((data) => {
      setImageUrl(`http://localhost:4000/${data}`);
    });
  };

  return (
    <><section className="fullpage-center" id={anchor}>
      <div className="future">
      <h2>
          This is your past image based on your anwsers...
          <div className="past-image-result"></div>
          {promptText}
          <br />
          <button onClick={handleClick}>Load AI generated image</button>
          <br />
          <img src={imageUrl} crossOrigin="anonymous" />
          <br />
        </h2>
      </div>
    </section>
    </>
  );
}

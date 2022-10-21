import React, { useState } from "react";
import { getImage } from "../../backend/app.service";

export function FutureSessionResults({ futureAnswers, anchor }) {
  const promptText = futureAnswers?.join(" ") + " " +  "colorful" +  " " + "futuristic";

  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    getImage(promptText).then((data) => {
      setImageUrl(`http://localhost:4000/${data}`);
    });
  };

  return (
    <><section className="fullpage-center" id={anchor}>
      <div className="future">
          <h3>
          This is your future image based on your answers...
          <div className="past-image-result"></div>
          </h3>
          <div className="promptText">
          <p>
          {promptText}
          </p>
          </div>
          <br />
          <h3>
          <button onClick={handleClick}>Load AI generated image</button>
          <br />
          <img src={imageUrl} crossOrigin="anonymous" />
          <br />
          </h3>
      </div>
    </section>
    </>
  );
}

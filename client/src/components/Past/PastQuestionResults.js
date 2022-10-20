import React, { useState } from "react";
import { getImage } from "../../backend/app.service";
import { scrollToElem } from "../../utilities";
import DButton from "../shared/DButton";

export function PastQuestionResults({ pastAnswers, anchor, nextAnchor }) {
  const promptText = pastAnswers?.join(" ") + "sepia " + "in the past";

  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    getImage(promptText).then((data) => {
      setImageUrl(`http://localhost:4000/${data}`);
    });
  };

  return (
    <section className="fullpage-center" id={anchor}>
      <div>
        <h3>
          This is your past image based on your anwsers...
          <div className="past-image-result"></div>
          <p>
          {promptText}
          </p>
          <button onClick={handleClick}>Load AI generated image</button>
          <br />
          <img src={imageUrl} crossOrigin="anonymous" />
          <br />
          <DButton text="Let's continue with your future!" func={() => scrollToElem(nextAnchor)} />
        </h3>
      </div>
    </section>
  );
}

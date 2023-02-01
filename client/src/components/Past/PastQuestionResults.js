import React, { useState } from "react";
import { getImage } from "../../backend/app.service";
import { scrollToElem } from "../../utilities";
import DButton from "../shared/DButton";

export function PastQuestionResults({ pastAnswers, anchor, nextAnchor }) {
  const promptText = pastAnswers?.join(" ")
  // + " " + "sepia " + "in the past";

  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    getImage(promptText).then((data) => {
      setImageUrl(`http://localhost:4000/${data}`);
    });
    setVisible(true);
    setHidden(true);
    setTimeout(() => { setShow(true) }, 6000)
  };

  return (
    <section className="fullpage-center" id={anchor}>
      <div>
        <h3>
          <div className="past-image-result"></div>
        </h3>
        <div className="promptText"><p>
          {promptText}
        </p>
        </div>
        <h3>
          <button onClick={handleClick}>Load AI generated image</button>
          <br></br>
          <img src={imageUrl} crossOrigin="anonymous" />
        </h3>
        { show ?
          <DButton text="Let's continue with your future!"
            func={() => scrollToElem(nextAnchor)
            } />:null
        } 
      </div>
    </section>
  );
}

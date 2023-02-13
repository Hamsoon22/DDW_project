import React, { useState } from "react";
import { getImage } from "../../backend/app.service";
import { scrollToElem } from "../../utilities";
import DButton from "../shared/DButton";
import "../StartSection.scss";
import LoadingSpinner from "../shared/LoadingSpinner"

export function PastQuestionResults({ pastAnswers, anchor, nextAnchor }) {
  const promptText = pastAnswers?.join(" ")
  // + " " + "sepia " + "in the past";

  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    getImage(promptText,"past")
      .then((data) => {
        setImageUrl(`http://localhost:4000/${data}`);
        setIsLoading(false)
      });
    setVisible(true);
    setHidden(true);
    setTimeout(() => { setShow(true) }, 4000)
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
          Let’s paint the picture
          <br></br>
          {!hidden && <button onClick={handleClick} disabled={isLoading}>show me my past dream</button>}
          <br></br>
          {isLoading ?
            <>
              <LoadingSpinner />
            </>
            : (
              <img src={imageUrl} crossOrigin="anonymous" />
            )
          }
          {show ?
            <div className="fadeIn">
              <DButton text="Let's continue with your future!"
                func={() => scrollToElem(nextAnchor)
                } />
            </div> : null
          }
        </h3>
      </div>

    </section>
  );
}

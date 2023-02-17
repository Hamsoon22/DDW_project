import React, { useState } from "react";
import { getImage } from "../../backend/app.service";
import "../StartSection.scss";
import LoadingSpinner from "../shared/LoadingSpinner"
import { scrollToElem } from "../../utilities";
import DButton from "../shared/DButton";

export function FutureSessionResults({ futureAnswers, anchor }) {
  const promptText = futureAnswers?.join(" ") + "futuristic";
  // + "colorful" +  " 

  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    getImage(promptText,"future")
      .then((data) => {
        setImageUrl(`http://localhost:4000/${data}`);
        setIsLoading(false)
      });
    setVisible(true);
    setHidden(true);
    setTimeout(() => { setShow(true) }, 5000)
  };

  return (
    <><section className="fullpage-center" id={anchor}>
      <div className="future">
        <h3>
          Let’s paint the picture
          <div className="past-image-result"></div>
        </h3>
        <div className="promptText">
          {/* <p>
            {promptText}
          </p> */}
        </div>
        <h3>
          {!hidden && <button onClick={handleClick}>show me my dream of the future</button>}
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
              <DButton text="Finish"
                func={() => scrollToElem("finish")
                } />
            </div> : null
          }
          <br />
        </h3>
      </div>
    </section>
    </>
  );
}

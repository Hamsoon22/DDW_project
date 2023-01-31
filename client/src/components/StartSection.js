import { scrollToElem } from "../utilities";
import React from "react";
import { useState } from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';

const StartSection = () => {
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false)

  // function clickStartEvent (){
  //   setVisible(true);
  //   // setHidden(true);
  // }

  return (
    <section className="fullpage-center" id="start">
      {!hidden && <button onClick={() => { setVisible(true); setHidden(true) }}>
        Click to Start
      </button>
      }

      {visible &&
        <h1>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome! ")
                .pauseFor(1000)
                .typeString("The Dream Sequencer collects anonymous data including text and images. ")
                .pauseFor(1000)
                .typeString("By clicking this button you consent to having your dreams saved in a database and posted on Instagram.")
                .pauseFor(2000)
                .start();
            }}
          />
        </h1>
      }
      {
        show ?
          <DButton text="click to continue" func={() =>
            scrollToElem("introdcution")} /> : null
      }
    </section >
  );
};

export default StartSection;

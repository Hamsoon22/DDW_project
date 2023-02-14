import { scrollToElem } from "../utilities";
import React from "react";
import { useState } from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';
import "./StartSection.scss";

const StartSection = ({ onContinue }) => {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
 
  return (
    <section className="fullpage-center" id="start">
      {!hidden && <button onClick={() => {
        setVisible(true);
        setHidden(true);
        setTimeout(() => { setShow(true) }, 30000)
      }}>
        Click to Start
      </button>
      }
      {visible &&
        <h1>
          <Typewriter
           options={{
            autoStart: true,
            delay:150,
            strings:"Welcome! The Dream Sequencer collects anonymous data including text and images. By clicking this button you consent to having your dreams saved in a database and posted on Instagram.",
            loop: false
            }}
          />
        </h1>
      }
      { show ?
        <div className="fadeIn">
          <DButton text="click to continue" func={() => 
          {
            scrollToElem("introdcution")
            onContinue()
          }
            } />
        </div>: null
      }
    </section >
  );
};

export default StartSection;

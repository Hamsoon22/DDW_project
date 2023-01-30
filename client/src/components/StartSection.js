import { scrollToElem } from "../utilities";
import React from "react";
import { useState } from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';

const StartSection = () => {
  const [show, setShow] = useState(false)
  return (
    <section className="fullpage-center" id="start">
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
              .deleteAll()
              .start();
          }}
        />
      </h1>
      {show ?
        <DButton text="click to continue" func={() =>
          scrollToElem("introdcution")} /> : null
      }
    </section>
  );
};

export default StartSection;

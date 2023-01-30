import { scrollToElem } from "../utilities";
import React from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';

const StartSection = () => {
  return (
    <section className="fullpage-center" id="start">
      <h1>
        <Typewriter
          options={{
            strings: 'Welcome! The Dream Sequencer collects anonymous data including text and images. By clicking this button you consent to having your dreams saved in a database and posted on Instagram.',
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <DButton text="click to continue" func={() =>
        scrollToElem("introdcution")} />
    </section>
  );
};

export default StartSection;

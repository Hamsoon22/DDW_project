import { scrollToElem } from "../utilities";
import React from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';

const Introduction = ({message}) => {
  console.log(message);

  return (
    <section className="fullpage-center" id="introdcution">
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Much of what we used to dream about in the past continues to influence our present and ")
              .pauseFor(1000)
              .typeString("by extension, to shape our future. ")
              .pauseFor(1000)
              .typeString("The Dream Sequencer helps to make these connections tangible by offering a moment of reflection. ")
              .pauseFor(1000)
              .typeString("Animated by Generative AI.")
              .pauseFor(2000)
              .start();
          }}
        />
      </h1>
      <DButton text="click to continue" func={() =>
        scrollToElem("PastSession")} />
    </section>
  );
};

export default Introduction;

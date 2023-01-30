import { scrollToElem } from "../utilities";
import React from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';

const Introduction = () => {
  return (
    <section className="fullpage-center" id="introdcution">
      <h1>
        <Typewriter
          options={{
            strings: 'Much of what we used to dream about in the past continues to influence our present and, by extension, to shape our future. The Dream Sequencer helps to make these connections tangible by offering a moment of reflection. Animated by Generative AI.',
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <DButton text="click to continue" func={() =>
        scrollToElem("PastSession")} />
    </section>
  );
};

export default Introduction;

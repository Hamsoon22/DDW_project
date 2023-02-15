import { scrollToElem } from "../utilities";
import React from "react";
import DButton from "./shared/DButton";
import Typewriter from 'typewriter-effect';
import { useState } from "react";

const Introduction = ({ show, startquestion }) => {
  const [ShowNext, setShowNext] = useState(false);
  const [hidden, setHidden] = useState(false);

  return (
    <section className="fullpage-center" id="introdcution">
      <h1>
        {hidden || show &&
          <Typewriter
            options={{
              autoStart: true,
              delay: 150,
              strings: 'Much of what we used to dream about in the past continues to influence our present and  by extension, shape our future.',
              loop: false,
            }}
          />
        }
        <br></br>
        {!hidden &&
          <DButton text="continue" func={() => {
            setShowNext(true)
            setHidden(true)
          }} />
        }
        <br></br>
        {ShowNext &&
          <Typewriter
            options={{
              autoStart: true,
              delay: 150,
              strings: 'The Dream Sequencer helps to make these connections tangible by offering a moment of reflection. Animated by Generative AI.',
              loop: false,
            }}
          />
        }
      </h1>
      {hidden &&
        <DButton text="click to continue" func={() => {
          scrollToElem("PastSession")
          startquestion()
        }}
        />
      }
    </section>
  );
};

export default Introduction;

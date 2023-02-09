import DButton from "../shared/DButton";
import { scrollToElem } from "../../utilities";
import React from "react";
import Typewriter from 'typewriter-effect';

export function PastQuestionIntroduction({ nextAnchor }) {
  return (
    <section className="fullpage-center" id="PastSession">
      <h1>
         <Typewriter
          options={{
            strings: 'Take a moment to think about the PAST and remind yourself of the things you dreamed of when you were younger.',
            autoStart: true,
            loop: false,
          }}
        />
      </h1>
      <DButton text="Ok" func={() => scrollToElem(nextAnchor)} />
    </section>
  );
}

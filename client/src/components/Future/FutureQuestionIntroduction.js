import DButton from "../shared/DButton";
import { scrollToElem } from "../../utilities";
import React from "react";
import Typewriter from 'typewriter-effect';

export function FutureQuestionIntroduction({futureshow}) {
  return (
    <section className="fullpage-center" id="futureSessionIntroduction">
      <h1>
      {futureshow &&
        <Typewriter
          options={{
            strings: 'Now take a moment to imagine your FUTURE.',
            autoStart: true,
            loop: false,
          }}
        />
      }
      </h1>
      <DButton text="Ok" func={() => scrollToElem("futurequestion-0")} />
    </section>
  );
}

import DButton from "../shared/DButton";
import { scrollToElem } from "../../utilities";
import React from "react";

export function FutureQuestionIntroduction() {
  return (
    <section className="fullpage-center" id="futureSessionIntroduction">
      <h1>Now,  think about the present.</h1>
      <h2>
        <br></br>What visions of a possible future motivate or affect you right
        now?
        <br></br>
        <p>
        These could be <strong>ideas, images, concepts, hopes, that are 'still to
        happen'</strong> but nevertheless have a hold on you—inspire or motivate you (or
        worry you), affecting the way you think about or approach the world.
        </p>
        </h2>
      <DButton text="Ok" func={() => scrollToElem("futurequestion-0")} />
    </section>
  );
}

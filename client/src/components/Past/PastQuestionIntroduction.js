import DButton from "../shared/DButton";
import { scrollToElem } from "../../utilities";
import React from "react";

export function PastQuestionIntroduction({ nextAnchor }) {
  return (
    <section className="fullpage-center" id="PastSession">
      <h1>First, think about Your past</h1>
      <h2>
        Think back to when you were younger.
        <br />
        What ideas or visions did you have of what the future might be like,
        <br />
        that still affect you today—even if they never happened? These could be
        ideas, images, concepts, memories, that are 'past' but still have a hold
        on you—still motivate or worry you, still affect the way you think about
        or approach the world. They might be about a specific area of life
        (technology, everyday living, environment, travel, fashion, politics) or
        more broadly.
      </h2>
      <DButton text="Ok" func={() => scrollToElem(nextAnchor)} />
    </section>
  );
}

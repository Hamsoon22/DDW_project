import DButton from "../shared/DButton";
import { scrollToElem } from "../../utilities";
import React from "react";

export function PastQuestionIntroduction({ nextAnchor }) {
  return (
    <section className="fullpage-center" id="PastSession">
      <h1>First, think back to when you were younger.</h1>
      <h2>
        <br />
        What ideas or visions did you have of what the future might be like,
        <br />
        <p>
        that still affect you today—even if they never happened? 
        These could be <strong> ideas, images, concepts, memories</strong>,  
        They might be about a specific area of life <strong>technology, everyday living, environment, travel, fashion, politics </strong> or
        more broadly.
        </p>
      </h2>
      <DButton text="Ok" func={() => scrollToElem(nextAnchor)} />
    </section>
  );
}

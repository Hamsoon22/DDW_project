import React from "react";
import { scrollToElem } from "../utilities";
import DButton from "./shared/DButton";

export function Finish() {
  return (
    <section className="fullpage-center" id="finish">
      <h3>Thank you for submiting your answer.
      <br />
      Check others past and future images on the screen</h3>
      <DButton text="start over" func={() => {
      scrollToElem("start")
      }}
      />
    </section>
  )
}

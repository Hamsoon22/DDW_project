import React from "react";
import { scrollToElem } from "../utilities";
import DButton from "./shared/DButton";

export function Finish() {
  return (
    <section className="fullpage-center" id="finish">
      <h3>
        <br />
      Thank you for your answer.</h3>
      {/* <Sending /> */}
      <div className="btn-group" style={{ display: "flex" }}>
        <DButton text="Start over" func={() => {
          scrollToElem("start")
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        }}
        />
      </div>
      </section>
      )
}

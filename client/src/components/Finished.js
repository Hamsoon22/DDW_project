import React from "react";
import { scrollToElem } from "../utilities";
import DButton from "./shared/DButton";

export function Finish() {
  return (
    <section className="fullpage-center" id="finish">
      <h3>
        <br />
      "The future belongs to those who believe in the beauty of their dreams" <br></br>––Eleanor Roosevelt</h3>
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

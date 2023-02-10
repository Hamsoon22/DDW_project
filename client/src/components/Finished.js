import React from "react";
import { scrollToElem } from "../utilities";
import DButton from "./shared/DButton";
import { useState } from "react";

export function Finish() {
  return (
    <section className="fullpage-center" id="finish">
      <h3>
        <br />
        If you would like to receive the images generated for you please leave your email address in the field below. We do not share nor keep the address.</h3>
      <input
        className="form_input"
        type="text"
      />
      <div className="btn-group" style={{ display: "flex" }}>
        <DButton text="Yes please" func={() => {
          //add sending email(image)
          scrollToElem("start")
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        }}
        />
        <DButton text="No thanks" func={() => {
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

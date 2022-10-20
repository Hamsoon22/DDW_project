import React, { useState } from "react";
import { renderHTML, scrollToElem } from "../../utilities";
import DButton from "../shared/DButton";

/**
 * Renders questions, answers and buttons to progress.
 * @param {{results: any, index: number, onSubmit: (answer: string) => any}} props
 */
export function Question({ result, index, maxQuestions, onSubmit, questionPrefix, resultElementId }) {
  const [data, setData] = useState(null);

  return (
    <>
      <section id={`${questionPrefix}-${index}`} className="fullpage-center">
        <h2>
          {index + 1}.{renderHTML(result.question)}
        </h2>
        <div className="answer">
          Please answer with one or two words in English.
          <input
            className="form_input"
            type="text"
            onChange={(val) => {
              setData(val.target.value);
            }}
          />
        </div>
        <section className="btn-group" style={{ display: "flex" }}>
          {index !== 0 && (
            <DButton
              text="prev"
              func={() => scrollToElem(`${questionPrefix}-${index - 1}`)}
            />
          )}
          {index + 1 !== maxQuestions && (
            <DButton
              text="next"
              func={() => {
                onSubmit(data);
                scrollToElem(`${questionPrefix}-${index + 1}`);
              }}
            />
          )}
          {index + 1 === maxQuestions && (
            <DButton
              text="finish"
              func={() => {
                onSubmit(data);
                scrollToElem(resultElementId);
              }}
            />
          )}
        </section>
      </section>
    </>
  );
}

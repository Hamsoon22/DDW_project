import { useContext } from "react";
import { Store } from "./AppContext";

function Finish() {
  const { chosenAnswers } = useContext(Store);

  // Nice to have
  // const textCompleted = (
  //   <Fragment>
  //     <h3>Thank you for submiting your answer.</h3>
  //     <Button text="start over" func={() => window.location.reload()} />
  //   </Fragment>
  // );

  // Nice to have
  // const textIncomplete = (
  //   <Fragment>
  //     <h4>Opps, looks like you haven't answered all the questions</h4>
  //     <p>Scroll up to see which questions you've missed out </p>
  //   </Fragment>
  // );

  /** Questions answered out of sequence will cause array to have `undefineds`
   * this variable counts the length with those filtered out
   */
  // const answeredQuestions = chosenAnswers.filter(
  //   (ar) => ar !== undefined
  // ).length;

  // return (
  //   <section className="fullpage-center" id="finish">
  //     {answeredQuestions === PastQuestions ? textCompleted : textIncomplete}
  //   </section>
  // );
}

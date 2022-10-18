// /*
// import React, { Fragment, useContext, useState } from "react";
// import { renderHTML, scrollToElem } from "./utilities";
// import { getImage } from "./backend/app.service";
//
// export default function Backup() {
//   return (
//     <div>
//       {/!*<StartSection />*!/}
//       {/!*<PastQuestionIntroduction />*!/}
//       {/!*{renderPastQuestions()}*!/}
//       {/!*<PastSessionResult pastAnswers={pastAnswers} />*!/}
//       {/!*<FutureSession />*!/}
//       {/!*{renderFutureQuestions()}*!/}
//       {/!*<FutureSessionResult futureAnswers={futureAnswers} />*!/}
//       <Finish />
//     </div>
//   );
// }
//
//
// function FutureSessionResult({ futureAnswers }) {
//   const [imageUrl, setImageUrl] = useState("");
//   const promptText = futureAnswers.join(" ") + "in future";
//   const handleClick = () => {
//     getImage(promptText).then((data) => {
//       setImageUrl(`http://localhost:4000/${data.serveUrl}`);
//     });
//   };
//
//   return (
//     <section className="fullpage-center" id="FuturetSessionResult">
//       <div className="future">
//         <h1>
//           This is your future image based on your anwser..
//           <div className="future-image-result"></div>
//           {promptText}
//           <br></br>
//           <button onClick={handleClick}>Show image</button>
//           <br></br>
//           <img id="image" src={imageUrl} crossOrigin="anonymous" />
//         </h1>
//       </div>
//     </section>
//   );
// }
//
// function Finish() {
//   const { chosenAnswers } = useContext(Store);
//   const textCompleted = (
//     <Fragment>
//       <h3>Thank you for submiting your answer.</h3>
//       <Button text="start over" func={() => window.location.reload()} />
//     </Fragment>
//   );
//
//   const textIncomplete = (
//     <Fragment>
//       <h4>Oops, looks like you haven't answered all the questions</h4>
//       <p>Scroll up to see which questions you've missed out </p>
//     </Fragment>
//   );
//
//   /!** Questions answered out of sequence will cause array to have `undefineds`
//    * this variable counts the length with those filtered out
//    *!/
//   // const answeredQuestions = chosenAnswers.filter(
//   //   (ar) => ar !== undefined
//   // ).length;
//
//   // return (
//   //   <section className="fullpage-center" id="finish">
//   //     {answeredQuestions === PastQuestions ? textCompleted : textIncomplete}
//   //   </section>
//   // );
// }
// */

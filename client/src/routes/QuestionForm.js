import data from "../data.json";
import StartSection from "../components/StartSection";
import React, { useState } from "react";
import { PastQuestionIntroduction } from "../components/Past/PastQuestionIntroduction";
import { Question } from "../components/shared/Question";
import { PastQuestionResults } from "../components/Past/PastQuestionResults";
import { FutureQuestionIntroduction } from "../components/Future/FutureQuestionIntroduction";
import { FutureSessionResults } from "../components/Future/FutureQuestionResults";
import { Finish } from "../components/Finished";
import Introduction from "../components/Introduction";
import Background from "../Background";

export const QuestionForm = () => {
  const pastResultMap = data.pastResults;
  const futureResultMap = data.futureResults;

  const pastQuestionCount = pastResultMap.length;
  const futureQuestionCount = futureResultMap.length;

  const [pastAnswers, setPastAnswers] = useState(pastResultMap.map(() => ""));
  const [futureAnswers, setFutureAnswers] = useState(
    futureResultMap.map(() => "")
  );

  return (
    <>
    <Background />
      <StartSection />
      <Introduction />
      <PastQuestionIntroduction nextAnchor={"pastquestion-0"} />
      {pastResultMap.map((result, index) => (
        <Question
          questionPrefix={"pastquestion"}
          resultElementId={"pastSessionResults"}
          key={index}
          maxQuestions={pastQuestionCount}
          result={result}
          index={index}
          onSubmit={(answer) =>
            setPastAnswers((prev) => {
              prev[index] = answer;
              return [...prev];
            })
          }
        />
      ))}
      <PastQuestionResults
        pastAnswers={pastAnswers}
        anchor={"pastSessionResults"}
        nextAnchor={"futureSessionIntroduction"}
      />

      <FutureQuestionIntroduction />
      {futureResultMap.map((result, index) => (
        <Question
          questionPrefix={"futurequestion"}
          resultElementId={"futureSessionResults"}
          key={index}
          maxQuestions={futureQuestionCount}
          result={result}
          index={index}
          onSubmit={(answer) =>
            setFutureAnswers((prev) => {
              prev[index] = answer;
              return [...prev];
            })
          }
        />
      ))}
      <FutureSessionResults
        anchor={"futureSessionResults"}
        futureAnswers={futureAnswers}
      />
      <Finish></Finish>
    </>
  );
};

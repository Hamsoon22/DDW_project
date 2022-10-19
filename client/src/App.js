import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionForm } from "./routes/QuestionForm";
import { Presenter } from "./routes/Presenter";
import "./styles.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionForm />}></Route>
          <Route path="/presenter" element={<Presenter />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};


export default App;

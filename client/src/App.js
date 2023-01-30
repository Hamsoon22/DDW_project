import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionForm } from "./routes/QuestionForm";
import { Presenter } from "./routes/Presenter";
import { Footer } from "./components/Footer"
import "./styles.scss";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionForm />}></Route>
          <Route path="/presenter" element={<Presenter />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer className="footer-app" />
    </>
  );
};


export default App;

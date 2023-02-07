import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionForm } from "./routes/QuestionForm";
import { Presenter } from "./routes/Presenter";
import { Past} from "./routes/Past";
import { Future } from "./routes/Future";
import { Footer } from "./components/Footer"
import "./styles.scss";
import Background from "./components/shared/Background";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/background" element={<Background />}></Route>
          <Route path="/" element={<QuestionForm />}></Route>
          <Route path="/presenter" element={<Presenter />}></Route>
          <Route path="/past" element={<Past />}></Route>
          <Route path="/future" element={<Future />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer className="footer-app" />
    </>
  );
};


export default App;

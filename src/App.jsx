import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lock from "./components/Lock";
import NextPage from "./components/NextPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lock />} />
        <Route path="/nextpage" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;

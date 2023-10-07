import AppointmentForm from "./components/AppointmentForm";
import {BrowserRouter, Routes, Route,} from "react-router-dom"
import DownloadForm from "./components/DownloadForm";



function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>

    <Route  path="/" element={  <AppointmentForm/>} />
    <Route  path="/DownloadForm" element={  <DownloadForm/>} />

    </Routes>
    
    </BrowserRouter>
    
    </>
  );
}

export default App;

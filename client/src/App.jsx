import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import ResourceGenerator from "./pages/ResourceGenerator";
import LearningDashboard from "./pages/Learning";
import ExamPage from "./pages/Exam";
import EmailManager from "./pages/EmailManager";
import CareerCounsellor from "./pages/CareerInsight";
import Workspace from "./pages/workspace";
import ExamTack from "./pages/ExamTack";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SolutionChatbot from "./pages/SolutionReview";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/learning" element={<LearningDashboard />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/email" element={<EmailManager />} />
          <Route path="/career" element={<CareerCounsellor />} />
          <Route path="/notes" element={<ResourceGenerator />} />
          <Route path="/bot" element={<SolutionChatbot />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/take-exam/:id" element={<ExamTack />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

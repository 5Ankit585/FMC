import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./Pages/PasswordReset";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import ExploreCollegesPage from "./Pages/ExploreCollegesPage";
import Counselling from "./Pages/Counselling";
import Scholarship from "./Pages/Scholarship";
import MyCourse from "./Pages/MyCourse";
import ExamAt from "./Pages/ExamAt";
import Companion from "./FooterPages/Companion";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";
import UniversityDetails from "./Pages/UniversityDetails";
import CourseRegister from "./Pages/CourseRegister";

// footer page imports 
import CollegeReview from './FooterPages/topExam/CollegeReview'
import GreatLakes from './FooterPages/topExam/GreatLakes'
import LPU from './FooterPages/topExam/LPU'
import Mahe from './FooterPages/topExam/Mahe'
import Service from './FooterPages/topExam/Service'
import Srm from './FooterPages/topExam/Srm'
import Upes from './FooterPages/topExam/Upes'

import CoursePage from './Pages/CoursePage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// University & Dashboard
import AgentDashboard from "./AgentDashboard/Agent";
import UniversityDashboard from "./dashboard/UniversityDashboard";
import UniversityPage from "./Pages/UniversityPage";
import UniversityRegister from "./Pages/UniversityRegister";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/explorecollegespage" element={<ExploreCollegesPage />} />
          <Route path="/universityDetails" element={<UniversityDetails />} />
          <Route path="/counselling" element={<Counselling />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/examat" element={<ExamAt />} />
          <Route path="/companion" element={<Companion />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/college-profile" element={<AdminHome />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/signup" element={<SignupModal />} />

          {/* University & Dashboard Routes */}
          <Route path="/agent-dashboard/*" element={<AgentDashboard />} />
          <Route path="/university-dashboard" element={<UniversityDashboard />} />
          <Route path="/university-page/:id" element={<UniversityPage />} />
          <Route path="/university-register" element={<UniversityRegister />} />

          {/* University Profile */}
          <Route path="/university-profile/:id" element={<UniversityPage />} />

          {/* Footer Page Routes */}
          <Route path="/college-review" element={<CollegeReview />} />
          <Route path="/service" element={<Service />} />
          <Route path="/lpu" element={<LPU />} />
          <Route path="/upes" element={<Upes />} />
          <Route path="/greatlake" element={<GreatLakes />} />
          <Route path="/mahe" element={<Mahe />} />
          <Route path="/srm" element={<Srm />} />
          <Route path="/coursepage/:id" element={<CoursePage />} />
          <Route path="/CourseRegister" element={<CourseRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
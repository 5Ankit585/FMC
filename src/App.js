import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./Pages/PasswordReset";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import ExploreCollegesPage from "./Pages/ExploreCollegesPage";
import Counsellingpage from "./Pages/Counsellingpage";
import Scholarship from "./Pages/Scholarship";
import Companion from "./FooterPages/Companion";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserList from "./Pages/Admin/UserList";
import AdminHome from "./Pages/Admin/AdminHome";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";
import UniversityDetails from "./Pages/UniversityDetails";
// footer page imports 
import CollegeReview from './FooterPages/topExam/CollegeReview'
import GreatLakes from './FooterPages/topExam/GreatLakes'
import LPU from './FooterPages/topExam/LPU'
import Mahe from './FooterPages/topExam/Mahe'
import Service from './FooterPages/topExam/Service'
import Srm from './FooterPages/topExam/Srm'
import Upes from './FooterPages/topExam/Upes'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/passwordreset" element={<PasswordReset />}></Route>
          <Route
            path="/explorecollegespage"
            element={<ExploreCollegesPage />}
          ></Route>
          <Route
            path="/universityDetails"
            element={<UniversityDetails />}
          ></Route>
          <Route path="/counsellingpage" element={<Counsellingpage />}></Route>
          <Route path="/scholarship" element={<Scholarship />}></Route>
          <Route path="/companion" element={<Companion />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/users" element={<UserList />} />
          <Route path="/college-profile" element={<AdminHome />} />

          <Route path="/login" element={<LoginModal />}></Route>
          <Route path="/signup" element={<SignupModal />}></Route>



        {/* footer page routes  */}

          <Route path="/college-review" element={<CollegeReview />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/lpu" element={<LPU />}></Route>
          <Route path="/upe" element={<Upes />}></Route>
          <Route path="/greatlake" element={<GreatLakes />}></Route>
          <Route path="/mahe" element={<Mahe />}></Route>
          <Route path="/mahe" element={<Mahe />}></Route>
          <Route path="/srm" element={<Srm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

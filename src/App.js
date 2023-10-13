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
          <Route path="/counsellingpage" element={<Counsellingpage />}></Route>
          <Route path="/scholarship" element={<Scholarship />}></Route>
          <Route path="/companion" element={<Companion />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/users" element={<UserList />} />
          <Route path="/college-profile" element={<AdminHome />} />

          <Route path="/login" element={<LoginModal />}></Route>
          <Route path="/signup" element={<SignupModal />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

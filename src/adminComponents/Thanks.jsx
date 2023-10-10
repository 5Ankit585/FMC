
import "./Thanks.css";
import NewAdminData from "../Pages/Admin/NewAdminData";
import FileUpload from "./brochure";

const Thanks = ({ data }) => {

  
  return (
    <div className="thanks-container">
      <h2>Upload Your Fee Structure</h2>
      <p>
        <NewAdminData />
      </p>
      <p>
        <FileUpload />
      </p>
    </div>
  );
};

export default Thanks;

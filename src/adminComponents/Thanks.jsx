
import "./Thanks.css";
import NewAdminData from "../Pages/Admin/NewAdminData";
import FileUpload from "./brochure";

const Thanks = ({data, updateFieldHandler }) => {

  
  return (
    <div className="thanks-container">
      <h2>Upload Your Fee Structure</h2>
      <p>
        <NewAdminData data={data} updateFieldHandler={updateFieldHandler}/>
      </p>
      <p>
        <FileUpload />
      </p>
    </div>
  );
};

export default Thanks;

import "./ReviewForm.css";

const ReviewForm = ({ data, updateFieldHandler }) => {
  return (
    <div className="review-form">
      <div className="form-control">
        <label htmlFor="comment">About University</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Write about your university/college"
          required
          onChange={(e) => updateFieldHandler("comment", e.target.value)}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="comment">Courses</label>
        <textarea
          name="course"
          id="course"
          placeholder="Enter your Course details"
          required
          onChange={(e) => updateFieldHandler("course", e.target.value)}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="comment">Admission Details</label>
        <textarea
          name="AdmissionDetails"
          id="AdmissionDetails"
          placeholder="Write your Admission details"
          required
          onChange={(e) => updateFieldHandler("AdmissionDetails", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ReviewForm;

import { useEffect, useState } from "react";
import axios from "axios";

const Facilities = ({ universityId }) => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if (!universityId) return;

    axios.get(`http://localhost:5000/api/universities/${universityId}`)
  .then((res) => {
    console.log("📥 API response:", res.data);
    setFacilities(res.data.facilities || []);
  })
  .catch((err) => console.error("❌ Error fetching facilities:", err));
  }, [universityId]);

  return (
    <div>
      <h2>Campus Facilities</h2>
      <div className="facilities-grid">
        {facilities.length > 0 ? (
          facilities.map((fac, idx) => (
            <div key={idx} className="facility-card">
              <h3>{fac.name}</h3>
              <p>{fac.description || "No description available"}</p>
            </div>
          ))
        ) : (
          <p>No facilities added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Facilities;

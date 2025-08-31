  import React from "react";
  import "./Aside.css";

  const nearbyColleges = [
    {
      id: 1,
      name: "ABC Institute of Technology",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "XYZ College of Engineering",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "LMN University",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "PQR Polytechnic",
      logo: "https://via.placeholder.com/40",
    },
  ];

  const Aside = () => {
    return (
      <aside className="aside-container">
        <h3 className="aside-title">Nearby Colleges</h3>
        <table className="aside-table">
          <tbody>
            {nearbyColleges.map((college) => (
              <tr key={college.id} className="aside-row">
                <td className="aside-logo-cell">
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="aside-logo"
                  />
                </td>
                <td className="aside-name-cell">{college.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
    );
  };

  export default Aside;

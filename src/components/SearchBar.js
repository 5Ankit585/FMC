import React, { Component } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      selectedState: "",
      selectedDistrict: "",
    };
  }

  handleStateChange = (e) => {
    this.setState({ selectedState: e.target.value });
  };

  handleDistrictChange = (e) => {
    this.setState({ selectedDistrict: e.target.value });
  };

  render() {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg flex">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stateSelect"
          >
            Select State:
          </label>
          <select
            id="stateSelect"
            value={this.state.selectedState}
            onChange={this.handleStateChange}
            className="w-full px-4 py-2 border rounded-lg shadow appearance-none hover:cursor-pointer"
          >
            <option value="">Select a State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="districtSelect"
          >
            Select District:
          </label>
          <select
            id="districtSelect"
            value={this.state.selectedDistrict}
            onChange={this.handleDistrictChange}
            className="w-full px-4 py-2 border rounded-lg shadow appearance-none hover:cursor-pointer"
          >
            <option value="">Select a District</option>
            {/* Populate district options based on the selected state */}
            {this.state.selectedState === "Andhra Pradesh" && (
              <>
                <option value="">Select a District</option>
                <option value="Anantapur">Anantapur</option>
                <option value="Chittoor">Chittoor</option>
                <option value="East Godavari">East Godavari</option>
                <option value="Guntur">Guntur</option>
                <option value="Krishna">Krishna</option>
                <option value="Kurnool">Kurnool</option>
                <option value="Prakasam">Prakasam</option>
                <option value="Srikakulam">Srikakulam</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Vizianagaram">Vizianagaram</option>
                <option value="West Godavari">West Godavari</option>
                {/* Add more district options for state1 */}
              </>
            )}
            {this.state.selectedState === "state2" && (
              <>
                <option value="district3">District 3</option>
                <option value="district4">District 4</option>
                {/* Add more district options for state2 */}
              </>
            )}
            {/* Add more state-specific district options */}
          </select>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faSearch}
            className="hover:cursor-pointer border m-3 p-3 mt-8 rounded-lg
             shadow appearance-none hover:bg-yellow-400"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;

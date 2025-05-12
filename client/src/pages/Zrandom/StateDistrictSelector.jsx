import React, { useState, useEffect } from 'react';

const StateDistrictSelector = () => {
  const [stateDistrictData, setStateDistrictData] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    // Fetch JSON data from public folder
    fetch('/states-districts.json')
      .then((res) => res.json())
      .then((data) => setStateDistrictData(data))
      .catch((err) => console.error('Failed to load state-district data', err));
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(stateDistrictData[state] || []);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div>
      <label>
        Select State:
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">--Select State--</option>
          {Object.keys(stateDistrictData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select District:
        <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedState}>
          <option value="">--Select District--</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default StateDistrictSelector;

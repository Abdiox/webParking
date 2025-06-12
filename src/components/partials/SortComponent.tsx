import React from "react";

const SortComponent = ({ onSortChange }) => {
  const [sortConfig, setSortConfig] = React.useState({
    key: "firstName",
    direction: "ascending"
  });

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [key, direction] = value.split(":");
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    onSortChange(newSortConfig);
  };

  return (
    <div className="sort-container">
      <label htmlFor="sort-select">Sortér efter: </label>
      <select
        id="sort-select"
        value={`${sortConfig.key}:${sortConfig.direction}`}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="firstName:ascending">Fornavn (A-Å)</option>
        <option value="firstName:descending">Fornavn (Å-A)</option>
        <option value="lastName:ascending">Efternavn (A-Å)</option>
        <option value="lastName:descending">Efternavn (Å-A)</option>
        <option value="rentalUnit:ascending">Lejemål (Stigende)</option>
        <option value="rentalUnit:descending">Lejemål (Faldende)</option>
        <option value="email:ascending">Email (A-Å)</option>
        <option value="email:descending">Email (Å-A)</option>
      </select>
    </div>
  );
};

export default SortComponent;

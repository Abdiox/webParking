import React from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    role: "",
    searchTerm: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="searchTerm"
        placeholder="Søg efter navn eller email eller lejemål"
        value={filters.searchTerm}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <select 
        name="role" 
        value={filters.role} 
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">Alle roller</option>
        <option value="USER">Bruger</option>
        <option value="ADMIN">Administrator</option>
        <option value="PVAGT">P-vagt</option>
      </select>
    </div>
  );
};

export default FilterComponent;

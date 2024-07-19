import { useEffect } from "react";
import "./Header.scss";
import moment from "moment";

function Header({
  userName,
  dishes,
  filterParameters,
  setFilterParameters,
  setFilteredDishes,
}) {
  const currentDate = moment().format("dddd, Do MMM YYYY");

  function handleSearchQuery(e) {
    const newFilterParameters = {
      ...filterParameters,
      searchQuery: e.target.value,
    };
    setFilterParameters(newFilterParameters);
  }
  useEffect(() => {
    const filteredDishes = dishes.filter((dish) => {
      const isCategoryMatch =
        filterParameters.category === "All" ||
        dish.category.key === filterParameters.category;

      const isSearchQueryMatch = dish.description
        .toLowerCase()
        .includes(filterParameters.searchQuery.toLowerCase());

      return isCategoryMatch && isSearchQueryMatch;
    });
    setFilteredDishes(filteredDishes);
  }, [dishes, filterParameters]);

  return (
    <div className="header">
      <div className="user-date-field">
        <h1 className="user-name-field">{userName}</h1>
        <p className="date-field">{currentDate}</p>
      </div>
      <div className="search-input">
        <img
          className="search-icon"
          src="../../../public/search-icon.svg"
        ></img>
        <input
          onKeyUp={handleSearchQuery}
          className="header-input"
          type="text"
          placeholder="Search for food, coffee, etc.."
        />
      </div>
    </div>
  );
}
export default Header;

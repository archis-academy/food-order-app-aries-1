import { useEffect, useState } from "react";
import "./Header.scss";

function getDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

function Header({
  fireStoreUser,
  dishes,
  filterParameters,
  setFilterParameters,
  setFilteredDishes,
}) {
  function handleSearchQuery(e) {
    const newFilterParameters = {
      ...filterParameters,
      searchQuery: e.target.value,
    };
    setFilterParameters(newFilterParameters);
  }
  useEffect(() => {
    const filteredDishes = dishes.filter((dish) => {
      const isOrderTypeMatch =
        filterParameters.orderType === "All" ||
        dish.orderType === filterParameters.orderType;

      const isCategoryMatch =
        filterParameters.category === "all" ||
        dish.category.key === filterParameters.category;

      const isSearchQueryMatch = dish.description
        .toLowerCase()
        .includes(filterParameters.searchQuery.toLowerCase());

      return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
    });
    setFilteredDishes(filteredDishes);
  }, [dishes, filterParameters]);

  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div className="header">
      <div className="user-date-field">
        {fireStoreUser ? (
          <>
            <h1 className="user-name-field">{fireStoreUser.displayName}</h1>
            <p className="date-field">{currentDate}</p>
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
      <form className="search-input">
        <input
          onKeyUp={handleSearchQuery}
          className="header-input"
          type="text"
          placeholder="Search for food, coffee, etc.."
        />
      </form>
    </div>
  );
}
export default Header;

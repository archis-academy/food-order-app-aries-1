import {useState} from "react";
import "./Header.scss";

function getDate(){
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const today = new Date();
  const day = days[today.getDay()];
  const date = today.getDate() ;
  const month = months[today.getMonth()] ;
  const year = today.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}


function Header({user}) {
  const [currentDate, setCurrentDate] = useState(getDate());
  const displayName = user && user.displayName ? user.displayName : '';

  return (
    <div className="header">
      <div className="user-date-field">
      <h1 className="user-name-field">{displayName}</h1>
      <p className="date-field">{currentDate}</p>
      </div>
        <form className="search-input">
        <input className="header-input" type="search" placeholder="Search for food, coffee, etc.."></input>
        </form>
    </div>
  )
}

export default Header
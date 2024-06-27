import RevenueIcon from "../../assets/Content/Revenue.svg";
import DishOrderedIcon from "../../assets/Content/DishOrdered.svg";
import CustomerIcon from "../../assets/Content/Customer.svg";
import UpIcon from "../../assets/Content/UpIcon.svg";
import DownIcon from "../../assets/Content/DownIcon.svg";

const revenue = {
  analyticIcon: RevenueIcon,
  ratio: 12,
  ratioIcon: UpIcon,
  total: 1234,
  totalTitle: "Total Revenue",
};
const dishOrdered = {
  analyticIcon: DishOrderedIcon,
  ratio: 34,
  ratioIcon: UpIcon,
  total: 5678,
  totalTitle: "Total Dish Ordered",
};
const customer = {
  analyticIcon: CustomerIcon,
  ratio: 56,
  ratioIcon: UpIcon,
  total: 7890,
  totalTitle: "Total Customer",
};

export { revenue, dishOrdered, customer };

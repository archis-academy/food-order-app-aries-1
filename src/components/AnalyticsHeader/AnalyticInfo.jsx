import RevenueIcon from "../../assets/Content/Revenue.svg";
import DishOrderedIcon from "../../assets/Content/DishOrdered.svg";
import CustomerIcon from "../../assets/Content/Customer.svg";
import UpIcon from "../../assets/Content/UpIcon.svg";
import { getDishes, getOrders, getUsers } from "../../db/foods";
import { useState, useEffect } from "react";

function AnalyticInfo() {
  const [analyticInfo, setAnalyticInfo] = useState({
    revenue: {
      analyticIcon: RevenueIcon,
      ratio: 12,
      ratioIcon: UpIcon,
      total: 0,
      totalTitle: "Total Revenue",
    },
    dishOrdered: {
      analyticIcon: DishOrderedIcon,
      ratio: 34,
      ratioIcon: UpIcon,
      total: 0,
      totalTitle: "Total Dish Ordered",
    },
    customer: {
      analyticIcon: CustomerIcon,
      ratio: 56,
      ratioIcon: UpIcon,
      total: 0,
      totalTitle: "Total Customer",
    },
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const ordersData = await getOrders();
        const revenue = ordersData.reduce(
          (sum, order) => sum + order.subtotal,
          0
        );

        const dishesData = await getDishes();
        const dishesOrdered = dishesData.reduce((sum, dish) => {
          if (dish.orderCount) {
            return sum + dish.orderCount;
          } else {
            return sum;
          }
        }, 0);

        const usersData = await getUsers();
        const totalCustomers = usersData.length;

        setAnalyticInfo({
          revenue: {
            ...analyticInfo.revenue,
            total: revenue,
          },
          dishOrdered: {
            ...analyticInfo.dishOrdered,
            total: dishesOrdered,
          },
          customer: {
            ...analyticInfo.customer,
            total: totalCustomers,
          },
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return analyticInfo;
}

export default AnalyticInfo;

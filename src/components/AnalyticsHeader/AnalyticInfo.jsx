import RevenueIcon from "../../assets/Content/Revenue.svg";
import DishOrderedIcon from "../../assets/Content/DishOrdered.svg";
import CustomerIcon from "../../assets/Content/Customer.svg";
import UpIcon from "../../assets/Content/UpIcon.svg";
import { getDishes, getOrders, getUsers } from "../../db/foods";
import { useState, useEffect } from "react";

function useAnalyticInfo() {
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
        const dishesOrdered = dishesData.reduce(
          (sum, dish) => sum + dish.orderCount,
          0
        );

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

export default useAnalyticInfo;

/*
 function AnalyticInfo() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDishesOrdered, setTotalDishesOrdered] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch orders and calculate total revenue
        const ordersData = await getOrders();
        const revenue = ordersData.reduce((sum, order) => sum + order.subtotal, 0);
        setTotalRevenue(revenue);

        // Fetch dishes and calculate total dishes ordered
        const dishesData = await getDishes();
        const dishesOrdered = dishesData.reduce((sum, dish) => sum + dish.orderCount, 0);
        setTotalDishesOrdered(dishesOrdered);

        // Fetch users and count total customers
        const usersData = await getUsers();
        setTotalCustomers(usersData.length);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  const revenue = {
    analyticIcon: RevenueIcon,
    ratio: 12, // This ratio should be dynamically calculated if needed
    ratioIcon: UpIcon,
    total: totalRevenue,
    totalTitle: "Total Revenue",
  };
  const dishOrdered = {
    analyticIcon: DishOrderedIcon,
    ratio: 34, // This ratio should be dynamically calculated if needed
    ratioIcon: UpIcon,
    total: totalDishesOrdered,
    totalTitle: "Total Dish Ordered",
  };
  const customer = {
    analyticIcon: CustomerIcon,
    ratio: 56, // This ratio should be dynamically calculated if needed
    ratioIcon: UpIcon,
    total: totalCustomers,
    totalTitle: "Total Customer",
  };

  return { revenue, dishOrdered, customer };
}

export default AnalyticInfo;
 */

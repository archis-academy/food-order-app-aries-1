import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCategories = async () => {
  try {
    let categoryList = [];
    if (!localStorage.getItem("categories")) {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      localStorage.setItem("categories", JSON.stringify(categoryList));
    } else {
      categoryList = JSON.parse(localStorage.getItem("categories"));
    }
    return categoryList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const getDishes = async () => {
  try {
    let dishesList = [];
    if (!localStorage.getItem("dishes")) {
      const dishesCollection = collection(db, "dishes");
      const dishesSnapshot = await getDocs(dishesCollection);
      dishesList = dishesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      localStorage.setItem("dishes", JSON.stringify(dishesList));
    } else {
      dishesList = JSON.parse(localStorage.getItem("dishes"));
    }
    return dishesList;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const getOrders = async () => {
  try {
    const ordersCollection = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersCollection);
    return ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
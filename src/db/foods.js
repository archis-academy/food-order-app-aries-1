// export const categories = [
//   {
//     id: 1,
//     name: "All",
//     key: "all",
//   },
//   {
//     id: 2,
//     name: "Hot Dishes",
//     key: "hot-dishes",
//   },
//   {
//     id: 3,
//     name: "Cold Dishes",
//     key: "cold-dishes",
//   },
//   {
//     id: 4,
//     name: "Soup",
//     key: "soup",
//   },
// ];

// const [_, hotDishes, coldDishes, soup] = categories;

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

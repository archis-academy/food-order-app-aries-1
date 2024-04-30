import { useState } from "react";
import categories from "./categories";
import "./CategoryTabs.scss";

function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState(null);
  function handleActiveCategory(category) {
    setActiveCategory(category);
  }

  return (
    <>
      <ul className="categoryTabs">
        {categories.map((category, index) => {
          return (
            <li
              className={activeCategory === category ? "active" : ""}
              key={index}
              onClick={() => {
                handleActiveCategory(category);
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CategoryTabs;

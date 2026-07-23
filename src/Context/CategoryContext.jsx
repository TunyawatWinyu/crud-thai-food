import { createContext, useContext, useState } from "react";
import dishes from "../Data/DishData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faFaceSmile,
  faFaceFlushed,
} from "@fortawesome/free-solid-svg-icons";
const CategoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  const [selectCategory, setSelectCategory] = useState("All");
  const [dish, setDish] = useState(dishes);
  const [search, setSearch] = useState("");

  const filterDishes = dish.filter((dish) => {
    const matchCategory =
      selectCategory === "All" || dish.category === selectCategory;

    const matchSearch = dish.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const updateDish = (updatedDish) => {
    setDish((prev) =>
      prev.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish)),
    );
  };

  const deleteDish = (id) => {
    console.log("ID DA ELIMINARE:", id);

    setDish((prev) => prev.filter((dish) => dish.id !== id));
  };

  const categories = [
    "All",
    "Appetizer",
    "Soup",
    "Salad",
    "Curry",
    "Stir Fry",
    "Noodles",
    "Rice",
    "Dessert",
    "Beverage",
  ];

  const getSpicyIcon = (level) => {
    switch (level) {
      case "Hot":
        return (
          <FontAwesomeIcon
            icon={faFire}
            style={{ color: "#d35400", marginRight: "5px" }}
          />
        );
      case "Medium":
        return (
          <FontAwesomeIcon
            icon={faFire}
            style={{ color: "#d35400", marginRight: "5px" }}
          />
        );

      case "Low":
        return (
          <FontAwesomeIcon
            icon={faFaceFlushed}
            style={{ color: "#03ca56", marginRight: "5px" }}
          />
        );
      case "Not-Spicy":
        return (
          <FontAwesomeIcon
            icon={faFaceSmile}
            style={{ color: "#03ca56", marginRight: "5px" }}
          />
        );

      default:
        return null;
    }
  };
  return (
    <CategoryContext.Provider
      value={{
        selectCategory,
        setSelectCategory,
        dish,
        categories,
        filterDishes,
        getSpicyIcon,
        updateDish,
        deleteDish,
        search,
        setSearch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}

import "./Category.css";
import { useCategory } from "../../Context/CategoryContext";

export default function Category() {
  const { categories, setSelectCategory, selectCategory } = useCategory();
  return (
    <div className="main_category_saction">
      <div className="category_section">
        {categories.map((category) => {
          return (
            <div
              key={category}
              className={selectCategory === category ? "active" : "category"}
            >
              <button onClick={() => setSelectCategory(category)}>
                {category}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

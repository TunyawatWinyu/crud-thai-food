import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faUtensils,
  faCircle,
  faMagnifyingGlass,
  faPen,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import Category from "../../Components/Food Category/Category";
import "./Home.css";
import { useCategory } from "../../Context/CategoryContext";
import dishes from "../../Data/DishData";
import EditDrawer from "../../Components/EditDrawer/EditDrawer";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddDish from "../../Components/AddDish/AddDish";

export default function Home() {
  const {
    filterDishes,
    getSpicyIcon,
    updateDish,
    deleteDish,
    search,
    setSearch,
    dish,
  } = useCategory();
  const availableDish = dish.filter((dish) => dish.available).length;
  const totalDish = dish.length;

  const [selectedDish, setSelectedDish] = useState(null);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const handleEdit = (dish) => {
    setSelectedDish(dish);
  };

  const closeAddDish = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const closeDrawer = () => {
    setSelectedDish(null);
  };

  return (
    <>
      <div className="home-container">
        <header>
          <div className="restaurant-container">
            <div className="restaurant-brand">
              <div className="restaurant-logo">
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ color: "rgb(255, 212, 59)" }}
                  size="xl"
                />
              </div>
              <div className="restaurant-name">
                <p style={{ margin: "0", color: "rgb(255, 212, 59)" }}>
                  THAI TO GO
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: "0",
                    fontSize: "1.5rem",
                  }}
                >
                  Thai Kitchen & Delivery
                </p>
              </div>
            </div>
            <div className="restaurant-description">
              <p>
                Authentic Thai flavors, made fresh and delivered to your door.
                Manage your menu below.
              </p>
            </div>
          </div>
          <div className="restaurant-badge">
            <div className="dish_on_menu" style={{ margin: "0" }}>
              <p style={{ margin: "0" }}>
                <span
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    style={{ color: "rgb(255, 212, 59)" }}
                    icon={faBagShopping}
                  />
                </span>
                {totalDish} dishes on menu
              </p>
            </div>
            <div className="available_menu">
              <p style={{ margin: "0" }}>
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: "rgb(0, 154, 15)", width: "10%" }}
                  />
                </span>
                {availableDish} available now
              </p>
            </div>
          </div>
        </header>
        <div className="find">
          <div className="search-container">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "rgb(215, 215, 215)" }}
              className="search-icon"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Write here ..."
            />
            <button className="addBtn" onClick={() => setIsOpenAdd(!isOpenAdd)}>
              + Add dish
            </button>
          </div>
          <div className="find_for_type">
            <Category />
          </div>
        </div>
        <div className="dishes">
          {filterDishes.map((dish) => {
            return (
              <article key={dish.id} className="dish_card">
                <div className="dish_image">
                  <img src={dish.image} alt={dish.name} />
                  <span className={`spicy ${dish.spicy}`}>
                    {getSpicyIcon(dish.spicy)}
                    {dish.spicy}
                  </span>
                  <span
                    className={`available ${dish.available ? "available" : "not_available"}`}
                  >
                    <FontAwesomeIcon
                      icon={dish.available ? faCircleCheck : faCircleXmark}
                      style={{ marginRight: "5px" }}
                    />
                    {dish.available ? "Available" : "Not Available"}
                  </span>
                  {dish.vegetarian && (
                    <span className="vegetarian">
                      <FontAwesomeIcon icon={faLeaf} />
                      Vegetarian
                    </span>
                  )}
                </div>

                <div className="dish_content">
                  <div className="dish_header">
                    <h3>{dish.name}</h3>
                    <strong>{dish.price}€</strong>
                  </div>

                  <span>{dish.category}</span>

                  <p className="description">{dish.description}</p>
                </div>
                <div className="dish_actions">
                  <Link
                    className="btn_edit"
                    // to="/edit"
                    onClick={() => handleEdit(dish)}
                  >
                    <FontAwesomeIcon className="edit_icon" icon={faPen} />
                    Edit
                  </Link>

                  <Link
                    className="btn_delete"
                    onClick={() => deleteDish(dish.id)}
                  >
                    <FontAwesomeIcon className="delete_icon" icon={faTrash} />
                    Delete
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        {/* edit Drawer */}
        {selectedDish && (
          <EditDrawer
            dish={selectedDish}
            closeDrawer={closeDrawer}
            updateDish={updateDish}
          />
        )}

        {/* Add Dish */}
        {isOpenAdd && <AddDish closeAddDish={closeAddDish} />}
      </div>
    </>
  );
}

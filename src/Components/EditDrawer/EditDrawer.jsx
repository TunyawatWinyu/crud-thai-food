import "./EditDrawer.css";
import { useState, useEffect } from "react";
import { useCategory } from "../../Context/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function EditDrawer({ dish, closeDrawer, updateDish }) {
  const { categories } = useCategory();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    spicy: "",
    available: false,
    vegetarian: false,
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        category: dish.category,
        price: dish.price,
        image: dish.image,
        spicy: dish.spicy,
        available: dish.available,
        vegetarian: dish.vegetarian,
      });
    }
  }, [dish]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    console.log("FILE:", file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        image: imageUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDish = {
      ...dish,
      ...formData,
      image: formData.image,
    };

    console.log("INVIO UPDATE:", updatedDish);

    updateDish(updatedDish);
    closeDrawer();
  };

  const LevelSpicy = ["Hot", "Medium", "Low", "Not Spicy"];
  return (
    <div className="drawer-overlay" onClick={closeDrawer}>
      <div className="edit-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="edit-drawer-header">
          <div className="edit-drawer-title">
            <h2>Edit Dish</h2>
            <span>Update the details below</span>
            <button className="edit-drawer-close" onClick={closeDrawer}>
              X
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="edit-drawer-form">
          <label>
            Dish Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Dish Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <div className="edit-drawer-row">
            <label>
              Price($)
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.slice(1).map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <label>
            Spicy Level
            <select name="spicy" value={formData.spicy} onChange={handleChange}>
              {LevelSpicy.map((level) => {
                return <option key={level}>{level}</option>;
              })}
            </select>
          </label>
          <label>
            Image URL
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            <input
              className="image-upload"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <div className="edit-drawer-actions">
            <label className="switch">
              <input
                type="checkbox"
                name="vegetarian"
                checked={formData.vegetarian}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vegetarian: e.target.checked,
                  })
                }
              />
              <span className="slider">
                <span className="text">Vegetarian</span>
              </span>
            </label>
            <label className="switch">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.checked,
                  })
                }
              />
              <span className="slider">
                <span className="text">Available</span>
              </span>
            </label>
          </div>
          <div className="form-action">
            <button className="btn-update" type="submit">
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ color: "rgb(255, 255, 255)", margin: "0 5px" }}
              />
              Save Changes
            </button>
            <button className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

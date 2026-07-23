import "./AddDish.css";
import { useState } from "react";
import { useCategory } from "../../Context/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function AddDish({ closeAddDish }) {
  const { categories, dish } = useCategory();
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
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

      console.log("IMAGE URL:", imageUrl);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "This field needs a name";
    }
    if (!formData.description) {
      errors.description = "This field needs a description";
    }
    if (!formData.price) {
      errors.price = "This field need a price";
    }
    if (!formData.image) {
      errors.image = "This field need an image";
    }

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const newDish = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
    };

    dish.push(newDish);

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      spicy: "",
      available: false,
      vegetarian: false,
    });
  };

  const LevelSpicy = ["Hot", "Medium", "Low", "Not Spicy"];

  return (
    <div className="add-dish-overlay" onClick={closeAddDish}>
      <div className="add-dish" onClick={(e) => e.stopPropagation()}>
        <div className="add-dish-header">
          <div className="add-dish-title">
            <h2>Add New Dish</h2>
            <span>Fill in the details to add to menu</span>
            <button className="add-dish-close" onClick={closeAddDish}>
              X
            </button>
          </div>
        </div>

        <form className="add-dish-form" onSubmit={handleSubmit}>
          <label>
            Dish Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Dish Description
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
            ></textarea>
            {errors && <span className="error">{errors.description}</span>}
          </label>

          <div className="add-dish-row">
            <label>
              Price($)
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors && <span className="error">{errors.price}</span>}
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Spicy Level
            <select name="spicy" value={formData.spicy} onChange={handleChange}>
              {LevelSpicy.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>

          <label>
            Image URL
            <input
              type="text"
              name="image"
              placeholder="Enter image URL or file name"
              value={formData.image}
              onChange={handleChange}
            />
            <input
              className="image-upload"
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {errors && <span className="error">{errors.image}</span>}
          </label>

          <div className="add-dish-actions">
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
                style={{
                  color: "rgb(255, 255, 255)",
                  margin: "0 5px",
                }}
              />
              Add Dish
            </button>

            <button className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

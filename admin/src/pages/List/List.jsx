import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaEye, FaTimes } from 'react-icons/fa';

const List = ({ url }) => {
  
  const [list, setList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Remove food item
  const removeFood = async (FoodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: FoodId });
    await fetchList();
    response.data.success ? toast.success(response.data.message) : toast.error("Error deleting item");
  };

  // Open Popup (View or Edit)
  const openPopup = (item, editMode = false) => {
    setSelectedFood({ ...item });
    setIsEditing(editMode);
  };

  // Close Popup
  const closePopup = () => {
    setSelectedFood(null);
    setIsEditing(false);
  };

  // Handle Input Change for Editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood((prev) => ({ ...prev, [name]: value }));
  };

  // Save Edited Data
  const saveChanges = async () => {
    const updatedData = {
      id: selectedFood._id,  
      name: selectedFood.name,
      description: selectedFood.description,
      category: selectedFood.category,
      price: selectedFood.price,
    };
  
    const response = await axios.post(`${url}/api/food/edit`, updatedData);
    
    if (response.data.success) {
      toast.success("Food item updated successfully");
      fetchList(); 
      closePopup();
    } else {
      toast.error("Error updating item");
    }
  };
  

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="action-icons">
              <FaEye className="icon view-icon" onClick={() => openPopup(item, false)} />
              <FaEdit className="icon edit-icon" onClick={() => openPopup(item, true)} />
              <FaTrash className="icon delete-icon" onClick={() => removeFood(item._id)} />
            </div>
          </div>
        ))}
      </div>

      {/* View/Edit Popup */}
      {selectedFood && (
        <div className="view-popup">
          <div className="popup-content">
            <FaTimes className="close-popup" onClick={closePopup} size={20} />
            <h2>{isEditing ? "Edit Food" : "Food Details"}</h2>

            <img src={`${url}/images/` + selectedFood.image} alt={selectedFood.name} />

            <div className="popup-form">
              <label>Name</label>
              <input type="text" name="name" value={selectedFood.name} onChange={handleChange} disabled={!isEditing} />

              <label>Category</label>
              <input type="text" name="category" value={selectedFood.category} onChange={handleChange} disabled={!isEditing} />

              <label>Description</label>
              <textarea name="description" value={selectedFood.description} onChange={handleChange} disabled={!isEditing} />
              <label>Price</label>
              <input type="number" name="price" value={selectedFood.price} onChange={handleChange} disabled={!isEditing} />
            </div>

            {isEditing && <button className="save-btn" onClick={saveChanges}>Save Changes</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

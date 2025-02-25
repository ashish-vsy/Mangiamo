import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Check if food_list is empty (loading state)
    const isLoading = food_list.length === 0;

    return (
        <div className='food-display' id="food-display">
            <h2>Top dishes near you</h2>
            {isLoading && <p className="loading-text">🍽️ Fetching food items... Please wait.</p>}

            <div className="food-display-list">
                {isLoading
                    ? // Show fallback skeleton cards while loading
                      [...Array(6)].map((_, index) => (
                          <div key={index} className="food-item skeleton">
                              <div className="skeleton-image"></div>
                              <div className="skeleton-text skeleton-name"></div>
                              <div className="skeleton-text skeleton-description"></div>
                              <div className="skeleton-text skeleton-price"></div>
                          </div>
                      ))
                    : // Show actual food items when data is available
                      food_list.map((item, index) => {
                          if (category === "All" || category === item.category) {
                              return (
                                  <FoodItem
                                      key={index}
                                      id={item._id}
                                      name={item.name}
                                      description={item.description}
                                      price={item.price}
                                      image={item.image}
                                  />
                              );
                          }
                          return null;
                      })}
            </div>
        </div>
    );
};

export default FoodDisplay;

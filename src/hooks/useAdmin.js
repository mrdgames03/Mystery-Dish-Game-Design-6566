import { useState, useEffect } from 'react';
import { AdminDataService } from '../data/adminData';

export const useAdmin = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDishes = async () => {
    try {
      setLoading(true);
      const data = await AdminDataService.getAllDishes();
      setDishes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveDish = async (dish) => {
    try {
      const savedDish = await AdminDataService.saveDish(dish);
      await loadDishes(); // Refresh list
      return savedDish;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDish = async (dishId) => {
    try {
      await AdminDataService.deleteDish(dishId);
      await loadDishes(); // Refresh list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const uploadImage = async (file) => {
    try {
      return await AdminDataService.uploadImage(file);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const importDishes = async (dishesData) => {
    try {
      await AdminDataService.bulkImport(dishesData);
      await loadDishes(); // Refresh list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  return {
    dishes,
    loading,
    error,
    saveDish,
    deleteDish,
    uploadImage,
    importDishes,
    refreshDishes: loadDishes
  };
};
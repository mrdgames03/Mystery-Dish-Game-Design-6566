// Admin database operations (will be replaced with Supabase)
export class AdminDataService {
  static async getAllDishes() {
    // In real app, this would fetch from Supabase
    try {
      const stored = localStorage.getItem('mystery-dish-admin-data');
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Error loading dishes:', error);
      return [];
    }
  }

  static async saveDish(dish) {
    try {
      const dishes = await this.getAllDishes();
      const existingIndex = dishes.findIndex(d => d.id === dish.id);
      
      if (existingIndex >= 0) {
        dishes[existingIndex] = dish;
      } else {
        dishes.push(dish);
      }
      
      localStorage.setItem('mystery-dish-admin-data', JSON.stringify(dishes));
      return dish;
    } catch (error) {
      console.error('Error saving dish:', error);
      throw error;
    }
  }

  static async deleteDish(dishId) {
    try {
      const dishes = await this.getAllDishes();
      const filtered = dishes.filter(d => d.id !== dishId);
      localStorage.setItem('mystery-dish-admin-data', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting dish:', error);
      throw error;
    }
  }

  static async uploadImage(file) {
    // In real app, this would upload to Supabase Storage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // For demo purposes, we'll use data URL
        // In production, upload to Supabase Storage and return URL
        resolve(e.target.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static async bulkImport(dishes) {
    try {
      localStorage.setItem('mystery-dish-admin-data', JSON.stringify(dishes));
      return dishes;
    } catch (error) {
      console.error('Error importing dishes:', error);
      throw error;
    }
  }
}
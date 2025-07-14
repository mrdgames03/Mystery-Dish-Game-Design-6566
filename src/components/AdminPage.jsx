import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DishEditor from './admin/DishEditor';
import DishList from './admin/DishList';
import ImageUploader from './admin/ImageUploader';
import { gameData } from '../data/gameData';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiUpload, FiSettings, FiDatabase, FiEye } = FiIcons;

const AdminPage = ({ onBackToGame }) => {
  const [dishes, setDishes] = useState(gameData);
  const [currentView, setCurrentView] = useState('list'); // list, edit, create
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Filter dishes based on search and difficulty
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || dish.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleCreateDish = () => {
    setSelectedDish({
      id: Date.now(),
      name: '',
      difficulty: 'easy',
      hints: [
        { id: 1, type: 'emoji', content: '', emoji: '🍽️' },
        { id: 2, type: 'emoji', content: '', emoji: '🍽️' },
        { id: 3, type: 'emoji', content: '', emoji: '🍽️' }
      ],
      correctAnswers: ['']
    });
    setCurrentView('edit');
  };

  const handleEditDish = (dish) => {
    setSelectedDish({ ...dish });
    setCurrentView('edit');
  };

  const handleSaveDish = (dishData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (dishes.find(d => d.id === dishData.id)) {
        // Update existing dish
        setDishes(dishes.map(d => d.id === dishData.id ? dishData : d));
        showMessage('success', 'Dish updated successfully!');
      } else {
        // Add new dish
        setDishes([...dishes, dishData]);
        showMessage('success', 'Dish created successfully!');
      }
      
      setCurrentView('list');
      setSelectedDish(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteDish = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      setDishes(dishes.filter(d => d.id !== dishId));
      showMessage('success', 'Dish deleted successfully!');
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(dishes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'mystery-dish-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    showMessage('success', 'Data exported successfully!');
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setDishes(importedData);
          showMessage('success', 'Data imported successfully!');
        } catch (error) {
          showMessage('error', 'Invalid JSON file format!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-4" style={{ marginTop: '30px' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiSettings} className="text-xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mystery Dish Admin</h1>
                <p className="text-gray-300">Manage game content and dishes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onBackToGame}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all"
              >
                <SafeIcon icon={FiEye} className="text-lg" />
                <span>View Game</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportData}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all"
                >
                  <SafeIcon icon={FiDatabase} className="text-lg" />
                  <span>Export</span>
                </button>
                
                <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all cursor-pointer">
                  <SafeIcon icon={FiUpload} className="text-lg" />
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`max-w-6xl mx-auto mb-4 p-4 rounded-xl ${
              message.type === 'success' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {currentView === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Controls */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={handleCreateDish}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-all"
                  >
                    <SafeIcon icon={FiPlus} className="text-lg" />
                    <span>Create Dish</span>
                  </button>
                </div>
              </div>

              {/* Dish List */}
              <DishList
                dishes={filteredDishes}
                onEdit={handleEditDish}
                onDelete={handleDeleteDish}
              />
            </motion.div>
          )}

          {currentView === 'edit' && selectedDish && (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DishEditor
                dish={selectedDish}
                onSave={handleSaveDish}
                onCancel={() => {
                  setCurrentView('list');
                  setSelectedDish(null);
                }}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
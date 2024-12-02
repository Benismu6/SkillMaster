import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Filter, 
  Star, 
  Plus, 
  Award, 
  TrendingUp 
} from 'lucide-react';

// Skill Card Component
const SkillCard = ({ skill, onLearn }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
        <Star 
          className={`h-5 w-5 ${skill.mastery > 7 ? 'text-yellow-500' : 'text-gray-300'}`} 
        />
      </div>
      <div className="flex items-center mb-2">
        <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
        <span className="text-sm text-gray-600">Mastery: {skill.mastery}/10</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{skill.category}</span>
        <button 
          onClick={() => onLearn(skill)}
          className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

// Skills Dashboard Main Component
const SkillsDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Simulated data - replace with actual API call
  useEffect(() => {
    const mockSkills = [
      { 
        id: 1, 
        name: 'Web Development', 
        category: 'Technology', 
        mastery: 8,
        description: 'Learn modern web technologies'
      },
      { 
        id: 2, 
        name: 'Digital Marketing', 
        category: 'Business', 
        mastery: 6,
        description: 'Master online marketing strategies'
      },
      { 
        id: 3, 
        name: 'Graphic Design', 
        category: 'Creative', 
        mastery: 7,
        description: 'Create stunning visual designs'
      }
    ];

    const mockCategories = [
      'Technology', 'Business', 'Creative', 'Personal Development'
    ];

    setSkills(mockSkills);
    setCategories(mockCategories);
  }, []);

  // Skill progress data for chart
  const skillProgressData = skills.map(skill => ({
    name: skill.name,
    mastery: skill.mastery
  }));

  // Handle skill learning
  const handleLearnSkill = (skill) => {
    // Implement skill learning logic
    console.log(`Learning skill: ${skill.name}`);
  };

  // Filter skills by category
  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Skills Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600">
            <Plus className="h-5 w-5 mr-2" />
            Add New Skill
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center hover:bg-gray-200">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex space-x-3">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
        >
          All Skills
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredSkills.map(skill => (
          <SkillCard 
            key={skill.id} 
            skill={skill} 
            onLearn={handleLearnSkill} 
          />
        ))}
      </div>

      {/* Skill Progress Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Skill Mastery Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillProgressData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mastery" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsDashboard;
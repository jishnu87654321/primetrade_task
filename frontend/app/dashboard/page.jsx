'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';
import { removeToken } from '../../utils/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      setUser(response.data);
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editingTask._id}`, editingTask);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task');
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>

        {user && (
          <div className="bg-white p-6 rounded shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <form onSubmit={handleCreateTask} className="mb-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
          </form>

          <ul>
            {filteredTasks.map(task => (
              <li key={task._id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div>
                  <button onClick={() => setEditingTask(task)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleUpdateTask} className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl mb-4">Edit Task</h2>
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={editingTask.completed}
                  onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
                  className="mr-2"
                />
                Completed
              </label>
              <div className="flex justify-end">
                <button type="button" onClick={() => setEditingTask(null)} className="mr-2 px-4 py-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
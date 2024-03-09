import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task: '' });
  const [editTask, setEditTask] = useState({ id: null, task: '' })
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const addTask = async () => {
    try {
      await axios.post('http://localhost:3001/tasks', newTask);
      setNewTask({ task: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const handleEdit = (task) => {
    setEditTask({ id: task.id, task: task.task });
  }
  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/tasks/${editTask.id}`, editTask)
      setEditTask({ id: null, task: '' })
      fetchTasks();
    } catch (error) {
      console.error('error updating task', error);
    }
  }
  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <div className="input-container">
        <input
          className="task-input"
          type="text"
          placeholder="Enter Task"
          value={newTask.task}
          onChange={(e) => setNewTask({ task: e.target.value })}
        />
        <button className="add-button" onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {
              editTask.id === task.id ? (
                <>
                <input type="text"  value={editTask.task}
                onChange={(e)=>setEditTask({...editTask , task:e.target.value})}
                />
                <button onClick={saveEdit}>Save</button>
                </>
              ) : (
                <>
                  <b > {task.task}</b>
                  <button className="delete-button" onClick={() => handleEdit(task)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )
            }
          </li>
        ))
        }
      </ul >
    </div >
  );
}
export default App;

import axios from 'axios';

const deleteTask = async (id, fetchTasks) => {
    try {
        await axios.delete(`http://localhost:3001/tasks/${id}`);
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};  

export default deleteTask;

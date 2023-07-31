import { useState } from "react";
import axios from "axios";

const NewTaskForm = ({ onAddTask }) => {
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:3050/tasks', { task: { title, description } });
      onAddTask(response.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('server Error:', error);
    }
  };


  return (
    <div className="border rounded p-2 h-100 bg-light">
      <form onSubmit={handleSubmit} className="d-flex flex-column" >
        <div className="form-group text-center"> 
          <h3>Add New Task</h3>
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Task Title</label>
          <textarea
            required
            id="title" 
            name="title" 
            rows="2"
            className="form-control mb-2"
            placeholder="Add title here..."
            value={title}
            onChange={handleTitleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Task Description</label>
          <textarea
            required
            id="description"
            name="description"
            className="form-control mb-2"
            placeholder="Add description here..."
            rows="9"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-warning mt-1">Add Task</button>
      </form>
    </div>
  );
};

export default NewTaskForm;
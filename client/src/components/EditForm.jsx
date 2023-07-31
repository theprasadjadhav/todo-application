import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const EditForm = ({ task,showEditForm, handleCloseEditForm,onEditHandler }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:3050/tasks/${task.id}`, { task: { ...formData } });
        onEditHandler({ ...formData , id:task.id });
    } catch (e) {
        console.log("server error: " + e.message);
    }  
    handleCloseEditForm();
    };
    

    const onCloseHandle = () => {
        const { title, description } = task;
        const oldData = { title, description };
        setFormData(oldData);
        handleCloseEditForm();
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={showEditForm} onHide={onCloseHandle}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <label htmlFor="title" className="form-label">Task Title</label>
            <textarea
                required
                id="title" 
                name='title' 
                rows="2"
                className="form-control mb-2"
                placeholder="Add title here..."
                defaultValue={formData.title}
                onChange={handleChange}
            ></textarea>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <label htmlFor="description" className="form-label">Task Description</label>
            <textarea
                required
                id="description"
                name='description'
                className="form-control mb-2"
                placeholder="Add description here..."
                rows="9"
                defaultValue={task.description}
                onChange={handleChange}
            />
            </Form.Group>
          <Button variant="warning" type="submit" className='w-100 mt-1'>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;

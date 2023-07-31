import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import { Trash, PencilSquare, ClipboardMinus} from "react-bootstrap-icons"
import axios from 'axios';
import EditForm from './EditForm';

function Task({ task, handlers}) {
    
    const { onDeleteHandler, onEditHandler } = handlers;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleShowEditForm = () => {
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3050/tasks/${id}`)
            onDeleteHandler(id);
        } catch (e) {
            console.error("server error: " + e.message)
         }
    }

    const onCopyTask = (id) => {
        navigator.clipboard.writeText(task.title)
        const copyText = document.getElementById(`copyText-${id}`);
        copyText.classList.remove('d-none');

        setTimeout(() => {
        copyText.classList.add('d-none');
        }, 2000);
    }

    return (
            <Card className='mb-2'>
            <Card.Header>
                <div className='d-flex justify-content-between'>
                    <b>{task.title}</b>
                    <div className='d-flex'>
                    <button className='btn custom-button p-1' onClick={()=>onCopyTask(task.id)}>
                        <ClipboardMinus size={23} />
                    </button>
                        <p id={`copyText-${task.id}` } className="d-none p-0 m-0 pt-2">Coppied!</p>
                    </div>
                </div>
            </Card.Header>
                <Card.Body>
                    <Card.Text>
                       {task.description}
                </Card.Text>
                
                <button className='btn custom-button p-1' onClick={()=>handleDelete(task.id)}>
                    <Trash size={23}/>
                </button>
                <button className='btn custom-button p-1' onClick={handleShowEditForm}>
                    <PencilSquare size={23} />
                </button>
                <EditForm task={task} showEditForm={showEditForm} handleCloseEditForm={handleCloseEditForm} onEditHandler={ onEditHandler} />
                </Card.Body>
            </Card>
    );
}

export default Task;

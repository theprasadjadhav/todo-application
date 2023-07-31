import {useState,useEffect} from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';

const MainBody = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3050/tasks')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
  }, []);

    const onAddTask = (newTaskData) => { 
       setTasks([newTaskData,...tasks]);
    }

    const onDeleteHandler = (taskId) => { 
      const updatedTasks = tasks.filter(t => t.id != taskId);
      setTasks(updatedTasks);
    }

    const onEditHandler = (EditedTask) => { 
      const updatedTasks = tasks.map(t => t.id === EditedTask.id ? EditedTask : t)
      setTasks(updatedTasks);
    }

  return (
    <div className="row mt-2">
      <div className="col-md-8">
        <TaskList tasks={tasks} handlers={{ onDeleteHandler, onEditHandler }} />
      </div>

      <div className="col-md-4">
              <NewTaskForm onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default MainBody;

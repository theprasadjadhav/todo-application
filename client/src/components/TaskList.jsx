import Task from "./Task";

const TaskList = ({ tasks,handlers }) => {
    
  return (
    <div className="border rounded p-2 bg-light" style={{ height: '475px', overflowY: 'auto' }}>
        {tasks.map((task) => (
            <Task key={task.id} task={task} handlers={handlers} />
        ))}
    </div>
  );
};

export default TaskList;

import React, { useState } from "react";
import { useDrag } from "react-dnd";

const TaskItem = ({ task,tasks,setTasks,slots,setSlots }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: task,
    end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          // Remove from tasks, add to slot
          setTasks(tasks.filter((t) => t.id !== item.id));
          setSlots((prev) => ({
            ...prev,
            [dropResult.slot]: [...prev[dropResult.slot], item],
          }));
        }
      },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white p-2 mb-2 rounded-lg shadow cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {task.title} ({task.priority}, {task.time} min)
    </div>
  );
};

const TaskForm = ({ tasks, setTasks,slots,setSlots }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [time, setTime] = useState("");
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTask = {
        id: Date.now(),
        title: task,
        priority,
        time: parseInt(time),
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setPriority("medium");
      setTime("");
  };
  return (
    <div className="w-full md:w-1/3">
      <form className="mb-4" onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task...."
          className="w-full p-2 border rounded-lg"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded-lg mt-2"
        >
          <option value="urgent">Urgent</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time (min)"
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button
          className="mt-2 w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <div>
        {tasks.map((t)=>(
            <div key={t.id} className="bg-white p-2 mb-2 rounded-lg shadow">
                {t.title} ({t.priority},{t.time} min)
            </div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;

import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskForm from "./TaskForm";
import SpiceRack from "./SpiceRack";
import StewPot from "./StewPot";

const Root = () => {
  const [tasks, setTasks] = useState([]);
  const [slots, setSlots] = useState({
    cumin: [], //urgent tasks
    turmeric: [], //medium
    coriander: [], //low
  });
  const [isMixed, setIsMixed] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sprint Spice Rack</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <TaskForm tasks={tasks} setTasks={setTasks} />
        <SpiceRack slots={slots} />
      </div>
      <StewPot
        isMixed={isMixed}
        setIsMixed={setIsMixed}
        slots={slots}
        setSlots={setSlots}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
};

export default Root;

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
    status:[],//status
  });
  const [isMixed, setIsMixed] = useState(false);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Sprint Spice Rack</h1>
        <div className="flex flex-col gap-6">
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <SpiceRack slots={slots} setSlots={setSlots} isMixed={isMixed} />
          <StewPot
            isMixed={isMixed}
            setIsMixed={setIsMixed}
            slots={slots}
            setSlots={setSlots}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Root;

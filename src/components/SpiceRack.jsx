import React from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";

const SpiceSlot = ({ name, tasks, setSlots, isMixed,slots }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => {
        setSlots((prev) => {
          const newSlots = { ...prev };
          Object.keys(newSlots).forEach((slot) => {
            newSlots[slot] = newSlots[slot].filter((t) => t.id !== item.id);
          });
          newSlots[name] = [...newSlots[name], item];
          return newSlots;
        });
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));
  
    const isOverloaded = tasks.length > 5;
  
    return (
      <div
        ref={drop}
        className={`w-full p-4 rounded-lg flex flex-col text-white spice-slot ${
          name === "cumin"
            ? "bg-red-400"
            : name === "turmeric"
            ? "bg-yellow-400"
            : name === "coriander"
            ? "bg-green-400"
            : "bg-blue-400" // Status slot
        } ${isOver ? "opacity-75" : ""} ${isOverloaded ? "bg-yellow-300" : ""}`}
      >
        <span className="font-bold text-lg mb-2">
          {name[0].toUpperCase() + name.slice(1)}
        </span>
        {isMixed && (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} setSlots={setSlots} slots={slots} name={name} />
            ))}
          </div>
        )}
        {isOverloaded && <span className="text-xs text-red-800 mt-2">Overloaded!</span>}
      </div>
    );
  };


const TaskCard = ({ task, setSlots, slots,name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: task,
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));
  
    const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      setSlots((prev) => {
        const newSlots = { ...prev };
        Object.keys(newSlots).forEach((slot) => {
          newSlots[slot] = newSlots[slot].map((t) =>
            t.id === task.id ? { ...t, status: newStatus } : t
          );
        });
        return newSlots;
      });
    };
  
        // Define background color based on priority when in status column
        const getPriorityColor = () => {
            if (name !== "status") return "bg-white";
            
            switch (task.priority) {
              case "urgent":
                return "bg-red-100 border-l-4 border-red-500";
              case "medium":
                return "bg-yellow-100 border-l-4 border-yellow-500";
              case "low":
                return "bg-green-100 border-l-4 border-green-500";
              default:
                return "bg-white";
            }
          };

    return (
      <div
        ref={drag}
        className={`${getPriorityColor()} p-2 rounded-lg shadow text-black flex justify-between items-center ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <span>
          {task.title} ({task.time}m)
        </span>
        {name === "status" && (
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="p-1 border rounded text-sm"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        )}
      </div>
    );
  };

  const SpiceRack = ({ slots, setSlots, isMixed }) => {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-silver-300 p-4 rounded-lg">
          <SpiceSlot name="cumin" tasks={slots.cumin} setSlots={setSlots} isMixed={isMixed} />
          <SpiceSlot name="turmeric" tasks={slots.turmeric} setSlots={setSlots} isMixed={isMixed} />
          <SpiceSlot name="coriander" tasks={slots.coriander} setSlots={setSlots} isMixed={isMixed} />
          <SpiceSlot name="status" tasks={slots.status} setSlots={setSlots} isMixed={isMixed} />
        </div>
      </div>
    );
  };

export default SpiceRack;

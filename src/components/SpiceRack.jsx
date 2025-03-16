import React from "react";
import { useDrop } from "react-dnd";

const SpiceSlot = ({ name, tasks, setSlots }) => {
  
    const isOverloaded = tasks.length > 5;
  
    return (
      <div
        className={`w-32 h-32 rounded-lg p-2 flex flex-col items-center justify-center text-white spice-slot ${
          name === "cumin"
            ? "bg-red-400"
            : name === "turmeric"
            ? "bg-yellow-400"
            : "bg-green-400"
        }  ${isOverloaded ? "bg-yellow-300" : ""}`}
      >
        <span className="font-bold">{name[0].toUpperCase() + name.slice(1)}</span>
        <div className="text-sm">
          {tasks.map((t) => (
            <div key={t.id}>{t.title} ({t.time}m)</div>
          ))}
        </div>
        {isOverloaded && <span className="text-xs text-red-800">Overloaded!</span>}
      </div>
    );
  };

const SpiceRack = ({ slots, setSlots }) => {
  return (
    <div className="w-full md:w-2/3">
      <div className="grid grid-cols-3 gap-4 bg-silver-300 p-4 rounded-full">
        <SpiceSlot name="cumin" tasks={slots.cumin} setSlots={setSlots} />
        <SpiceSlot name="turmeric" tasks={slots.turmeric} setSlots={setSlots} />
        <SpiceSlot
          name="coriander"
          tasks={slots.coriander}
          setSlots={setSlots}
        />
      </div>
    </div>
  );
};

export default SpiceRack;

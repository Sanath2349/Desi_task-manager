import React from "react";
import { gsap } from "gsap";

const StewPot = ({ isMixed, setIsMixed, slots, setSlots, tasks, setTasks }) => {
  const handleMix = () => {
    if (tasks.length === 0) return;

    // Sort tasks into slots based on priority
    const newSlots = {
      cumin: tasks.filter((t) => t.priority === "urgent"),
      turmeric: tasks.filter((t) => t.priority === "medium"),
      coriander: tasks.filter((t) => t.priority === "low"),
      status:slots.status
    };

    // Update slots and clear tasks
    setSlots(newSlots);
    setTasks([]);

    // Animate
  // Animate
  gsap.to(".spice-slot", { y: 50, opacity: 0, duration: 0.5, stagger: 0.2 });
  gsap.to(".spice-slot", { y: 0, opacity: 1, duration: 0.5, delay: 0.7 });
  gsap.to(".stew-pot-container", { rotation: 360, duration: 1.5, delay: 0.5 });
  setTimeout(() => setIsMixed(true), 1500);
  };

  const handleReset = () => {
    setSlots({ cumin: [], turmeric: [], coriander: [], status: [] });
    setIsMixed(false);
  };

  const handleExport = () => {
    const data = JSON.stringify(slots);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sprint-summary.json";
    a.click();
  };

  const hasTasks = tasks.length > 0;

  return (
    <div className="mt-6 text-center stew-pot-container">
      <button
        onClick={handleMix}
        className="bg-purple-800 text-white p-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
        disabled={isMixed || !hasTasks}
      >
        Mix the Stew
      </button>
      <button onClick={handleReset} className="m-2 bg-red-500 text-white p-2 rounded-lg">Reset</button>
      {isMixed && (
        <div className="mt-4">
          <div className="bg-brown-500 h-24 w-24 mx-auto rounded-lg stew-pot">
            <p className="text-black pt-8">Sprint Stew Ready!</p>
          </div>
          <button
            onClick={handleExport}
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Export Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default StewPot;

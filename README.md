
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Project Overview

Purpose: A sprint planning tool styled as a masala dabba—drag tasks into spice slots, animate into a “sprint stew.”
Target Users: Agile teams or solo devs in India (e.g., IT firms, startups).

Objective: Simplify daily sprint planning with a fun, cultural twist.

Features
Task Management
Add/edit tasks with priority/time estimates.
Drag into slots (e.g., “Cumin = Urgent”).

Spice Animation
Tasks “mix” into a stew on completion.

Sprint Summary
Exportable task list with timings.

Overload Warning
Flags too many tasks per slot.

Tech Stack
Frontend: React (with react-dnd).
Styling: Tailwind CSS.
Animation: GSAP.
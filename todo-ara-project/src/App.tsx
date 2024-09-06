import { PlusIcon } from "@heroicons/react/24/outline";
import "./App.css";
import { Header } from "./components/Header";
import { MobileFooter } from "./components/MobileFooter";
import { TaskList } from "./components/TaskList";
import { Button } from "./components/utils/Button";
import { TaskRecord, addTaskRecursively, createNewTask, getTasks } from "./services/TaskService";
import { createContext, useState } from "react";

export interface ListOutletContext {
	tasksState: [TaskRecord, React.Dispatch<React.SetStateAction<TaskRecord>>];
}

export const ListContext = createContext<ListOutletContext | null>(null);

function App() {
	const tasksState = useState(getTasks());
	const [tasks, setTasks] = tasksState;

	console.log(tasks);

	return (
		<ListContext.Provider value={{ tasksState }}>
			<Header />
			<div className="relative top-40 p-10 pb-20 md:pb-0 h-full w-full">
				<TaskList tasks={tasks} />
			</div>
			<MobileFooter />
		</ListContext.Provider>
	);
}

export default App;

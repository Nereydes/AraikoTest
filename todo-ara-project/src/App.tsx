import { DocumentArrowDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import "./App.css";
import { Header } from "./components/Header";
import { MobileFooter } from "./components/MobileFooter";
import { TaskList } from "./components/TaskList";
import { Button, ButtonWithIcon } from "./components/utils/Button";
import { Task, TaskRecord, getJSONUrlFromTasksList, getTasks } from "./services/TaskService";
import { createContext, useState } from "react";

export interface ListOutletContext {
	tasksState: [Task[], React.Dispatch<React.SetStateAction<Task[]>>];
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
				<a href={getJSONUrlFromTasksList(tasks)} download>
					<ButtonWithIcon icon={<DocumentArrowDownIcon className="w-4 h-4" />} variant="yellow" label="Télécharger la liste" />
				</a>
				<TaskList tasks={tasks.filter((task) => task.parentId === undefined)} />
			</div>
			<MobileFooter />
		</ListContext.Provider>
	);
}

export default App;

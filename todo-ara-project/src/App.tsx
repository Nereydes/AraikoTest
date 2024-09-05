import { PlusIcon } from "@heroicons/react/24/outline";
import "./App.css";
import { Header } from "./components/Header";
import { MobileFooter } from "./components/MobileFooter";
import { TaskLine } from "./components/TaskLine";
import { TaskList } from "./components/TaskList";
import { Button } from "./components/utils/Button";
import { Task } from "./services/TaskService";

function App() {
	const tasks: Task[] = [
		{
			order: 0,
			name: "Manger de la choucroute",
			creationDate: new Date(2024, 9, 3, 18, 50, 36, 2),
			isCompleted: false,
		},
		{
			order: 2,
			name: "Regarder Harry Potter 3",
			creationDate: new Date(2024, 9, 4, 17, 20, 46, 8),
			isCompleted: true,
			subtasks: [
				{
					order: 0,
					name: "Brancher la télé",
					creationDate: new Date(2024, 9, 4, 17, 22, 10, 8),
					isCompleted: true,
				},
				{
					order: 1,
					name: "Trouver la télécommande",
					creationDate: new Date(2024, 9, 4, 19, 28, 34, 20),
					isCompleted: true,
				},
			],
		},
		{
			order: 1,
			name: "Caresser le chat",
			creationDate: new Date(2024, 9, 4, 17, 22, 10, 8),
			isCompleted: true,
		},
	];
	return (
		<>
			<Header />
			<div className="relative top-40 p-10 pb-20 md:pb-0 h-full w-full">
				<TaskList tasks={tasks || []} />
				<Button className="flex gap-1 items-center ml-16 mt-10" variant="yellow">
					<PlusIcon className="w-3 h-3" />
					Ajouter une tâche
				</Button>
			</div>
			<MobileFooter />
		</>
	);
}

export default App;

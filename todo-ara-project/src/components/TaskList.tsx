import { PlusIcon } from "@heroicons/react/24/outline";
import { Task } from "../services/TaskService";
import { TaskLine } from "./TaskLine";
import { Button } from "./utils/Button";

export const TaskList = (props: { tasks: Task[] }) => {
	const { tasks } = props;

	return (
		<ul className="ml-10">
			{tasks
				.sort((a, b) => a.order - b.order)
				.map((task, index) => (
					<TaskLine key={index} {...task} />
				))}
		</ul>
	);
};

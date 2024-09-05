export interface Task {
	name: string;
	isCompleted: boolean;
	creationDate: Date;
	order: number;
	subtasks?: Task[];
}

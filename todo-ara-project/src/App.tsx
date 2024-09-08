import "./App.css";
import { createContext, useState } from "react";
import { getLists, List } from "./services/ListService";
import { Button, ButtonWithIcon } from "./components/utils/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { UploadListButton } from "./components/UploadListButton";
import { ListPreview } from "./components/ListPreview";
import { ListDisplay } from "./components/ListDisplay";
import { DialogTrigger } from "react-aria-components";
import { ListManagement } from "./components/ListManagement";

export interface ListOutletContext {
	listsState: [List[], React.Dispatch<React.SetStateAction<List[]>>];
	currentListState: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
}

export const ListContext = createContext<ListOutletContext | null>(null);

function App() {
	const listsState = useState(getLists());
	const [lists, setLists] = listsState;
	const currentListState = useState<string | undefined>(lists[0]?.id);
	const [currentList, setCurrentList] = currentListState;

	console.log(currentList);

	return (
		<ListContext.Provider value={{ listsState, currentListState }}>
			{/* <Header />
			<div className="relative top-40 p-10 pb-20 md:pb-0 h-full w-full">
				 <a href={getJSONUrlFromTasksList(tasks)} download>
					<ButtonWithIcon icon={<DocumentArrowDownIcon className="w-4 h-4" />} variant="yellow" label="Télécharger la liste" />
				</a> 
				<TaskList tasks={tasks.filter((task) => task.parentId === undefined)} />
			</div>
			<MobileFooter /> */}
			<div className="h-screen max-h-screen w-full flex p-3 items-center">
				<div className="basis-1/2 h-full px-72 py-52">
					<div className="h-full w-full">
						<div className="flex flex-col gap-8 items-center">
							<h1 className="text-4xl place-self-start font-bold">Mes supers listes</h1>
							<span className="text-sm text-light/60">
								Choisissez une liste pour voir les tâches à effectuer, créez-en une nouvelle ou importez-la depuis un fichier existant !
							</span>
							<DialogTrigger>
								<Button variant="yellow" size="md" className="w-1/2">
									<PlusIcon className="w-4 h-4" />
									Ajouter une nouvelle liste
								</Button>
								<ListManagement />
							</DialogTrigger>
							<UploadListButton className="w-1/2" />
						</div>
						<p className="text-lg mt-20">
							Listes créées <span className="text-light/60 text-sm">({lists.length})</span>
						</p>
						<div className="p-1 flex flex-wrap gap-8 mt-5 h-1/2 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-light scrollbar-track-dark">
							{lists.map((list) => (
								<ListPreview key={list.id} list={list} />
							))}
						</div>
					</div>
				</div>
				<div className="basis-1/2 h-full rounded-xl bg-light text-dark p-20">
					<ListDisplay />
				</div>
			</div>
		</ListContext.Provider>
	);
}

export default App;

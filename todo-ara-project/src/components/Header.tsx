import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ButtonWithIcon } from "./utils/Button";

export const Header = () => {
	return (
		<div className="h-40 w-full fixed bg-green z-10 flex p-5 items-center gap-5">
			<img src="araLogo.png" alt="Random logo" className="h-4/5" />
			<h1 className="grow text-3xl font-bold">Super titre</h1>
			<ButtonWithIcon icon={<PlusIcon className="w-5 h-5" />} label="Nouvelle liste" variant="yellow" />
			<ButtonWithIcon icon={<ArrowUpTrayIcon className="w-5 h-5" />} label="Importer une liste" variant="yellow" />
		</div>
	);
};

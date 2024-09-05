import { NewListButton } from "./NewListButton";
import { UploadListButton } from "./UploadListButton";

export const Header = () => {
	return (
		<div className="h-40 w-full fixed bg-green z-10 flex p-5 items-center gap-5">
			<img src="araLogo.png" alt="Random logo" className="h-4/5" />
			<h1 className="grow text-3xl font-bold">Super titre</h1>
			<NewListButton className="hidden md:flex" />
			<UploadListButton className="hidden md:flex" />
		</div>
	);
};

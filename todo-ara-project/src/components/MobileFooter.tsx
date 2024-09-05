import { NewListButton } from "./NewListButton";
import { UploadListButton } from "./UploadListButton";

export const MobileFooter = () => {
	return (
		<div className="md:hidden fixed bottom-0 h-20 right-0 left-0 bg-green flex items-center justify-center gap-20">
			<UploadListButton />
			<NewListButton />
		</div>
	);
};

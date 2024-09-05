import { PlusIcon } from "@heroicons/react/24/outline";
import { ButtonWithIcon } from "./utils/Button";

export const NewListButton = (props: { className?: string }) => {
	return <ButtonWithIcon {...props} icon={<PlusIcon className="w-5 h-5" />} label="Nouvelle liste" variant="yellow" />;
};

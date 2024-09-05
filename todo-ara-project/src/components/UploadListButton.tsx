import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ButtonWithIcon } from "./utils/Button";

export const UploadListButton = (props: { className?: string }) => {
	return <ButtonWithIcon {...props} icon={<ArrowUpTrayIcon className="w-5 h-5" />} label="Importer une liste" variant="yellow" />;
};

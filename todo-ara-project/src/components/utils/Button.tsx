import { Button, Tooltip, TooltipTrigger, type ButtonProps } from "react-aria-components";
import { generateClassName } from "../../utils/StyleUtilities";

export type ButtonVariant = "green" | "blue" | "yellow";

export interface ButtonWithIconProps extends Omit<ButtonProps, "children"> {
	icon: JSX.Element;
	label: string;
	variant?: ButtonVariant;
}

const buttonColorsAccordingVariant = {
	green: "bg-green border-green-dark hover:bg-green-light active:bg-green-dark",
	blue: "bg-blue border-blue-dark hover:bg-blue-light active:bg-blue-dark",
	yellow: "bg-yellow border-yellow-dark hover:bg-yellow-light active:bg-yellow-dark",
};

export const ButtonWithIcon = (props: ButtonWithIconProps) => {
	const { icon, label, variant = "green", ...otherProps } = props;

	return (
		<TooltipTrigger delay={0}>
			<Button
				{...otherProps}
				className={generateClassName(
					buttonColorsAccordingVariant[variant],
					"w-8 h-8 rounded-full outline-none flex justify-center items-center transition-colors group"
				)}
			>
				<span className="group-hover:relative group-hover:top-1 group-hover:animate-bounce">{icon}</span>
			</Button>
			<Tooltip className="bg-dark text-light px-5 py-2 rounded-lg mb-2">{label}</Tooltip>
		</TooltipTrigger>
	);
};

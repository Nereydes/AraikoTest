import { Button as AriaButton, Tooltip, TooltipTrigger, type ButtonProps } from "react-aria-components";
import { generateClassName } from "../../utils/StyleUtilities";

export type ButtonVariant = "green" | "blue" | "yellow" | "transparent";

export interface ButtonBaseProps extends Omit<ButtonProps, "children" | "className"> {
	variant?: ButtonVariant;
	className?: string;
	children?: React.ReactNode;
}

export interface ButtonWithIconProps extends ButtonBaseProps {
	icon: JSX.Element;
	label: string;
}

const buttonColorsAccordingVariant = {
	green: "bg-green hover:bg-green-light active:bg-green-dark",
	blue: "bg-blue hover:bg-blue-light active:bg-blue-dark",
	yellow: "bg-yellow hover:bg-yellow-light active:bg-yellow-dark",
	transparent: "bg-none",
};

export const ButtonWithIcon = (props: ButtonWithIconProps) => {
	const { icon, label, variant = "green", className, children, ...otherProps } = props;

	return (
		<TooltipTrigger delay={0}>
			<AriaButton
				{...otherProps}
				className={generateClassName(
					className,
					buttonColorsAccordingVariant[variant],
					"w-8 h-8 rounded-full outline-none flex justify-center items-center transition-colors group"
				)}
			>
				<span className="group-hover:relative group-hover:top-1 group-hover:animate-bounce">{icon}</span>
				{children}
			</AriaButton>
			<Tooltip className="bg-dark text-light px-5 py-2 rounded-lg mb-2">{label}</Tooltip>
		</TooltipTrigger>
	);
};

export const Button = (props: ButtonBaseProps) => {
	const { variant = "transparent", className, ...otherProps } = props;
	return (
		<AriaButton {...otherProps} className={generateClassName(className, buttonColorsAccordingVariant[variant], "px-3 py-1 text-xs shadow-md rounded-lg")} />
	);
};

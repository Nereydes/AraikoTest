import { Button as AriaButton, Tooltip, TooltipTrigger, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { generateClassName } from "../../utils/StyleUtilities";

/**
 * Select button color and other formatting details.
 */
export type ButtonVariant = "green" | "blue" | "yellow" | "transparent";

/**
 * Select button size.
 */
export type ButtonSize = "xs" | "sm" | "md" | "lg";

/**
 * Basic button props using the React Aria library with some simplified types.
 * @see https://react-spectrum.adobe.com/react-spectrum/Button.html#button
 */
export interface ButtonBaseProps extends Omit<AriaButtonProps, "children" | "className"> {
	/**
	 * Select button color and other formatting details.
	 */
	variant?: ButtonVariant;
	className?: string;
	children?: React.ReactNode;
}

export interface ButtonProps extends ButtonBaseProps {
	/**
	 * Select button size.
	 */
	size?: ButtonSize;
}

export interface ButtonWithIconProps extends ButtonBaseProps {
	/**
	 * JSX element, basically an icon to be displayed in the center of the button.
	 * The button is 32px, so the child element must be sized accordingly.
	 */
	icon: JSX.Element;
	/**
	 * Text written in a toast displayed when the button is hovered.
	 */
	label: string;
}

/**
 * Shapes the button according to the chosen variant.
 * Because of Tailwind, we can't construct class names dynamically.
 * We have to complete class names that are statically detectable at build-time.
 * @see https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
const buttonColorsAccordingVariant = {
	green: "bg-green hover:bg-green-light active:bg-green-dark shadow-md",
	blue: "bg-blue hover:bg-blue-light active:bg-blue-dark shadow-md",
	yellow: "bg-yellow hover:bg-yellow-light active:bg-yellow-dark text-dark shadow-md",
	transparent: "bg-none",
};

/**
 * Size the button according to the chosen size.
 * Because of Tailwind, we can't construct class names dynamically.
 * We have to complete class names that are statically detectable at build-time.
 * @see https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
const buttonSize = {
	xs: "p-1 text-xs",
	sm: "px-3 py-1 text-sm",
	md: "px-5 py-3 text-base",
	lg: "px-5 py-3 text-lg",
};

/**
 * A round button with a central icon. Displays a descriptive toast on hover.
 * @param {JSX.Element} props.icon Icon to be displayed in the center of the button. Required.
 * @param {string} props.label Text written in a toast. Required.
 * @param {ButtonVariant} props.variant Style the button. Optional. Is "green" by default.
 */
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

/**
 * A classic button.
 * @param {ButtonVariant} props.variant Style the button. Optional. Is "transparent" by default.
 * @param {ButtonSize} props.size Size the button. Optional. Is "sm" by default.
 */
export const Button = (props: ButtonProps) => {
	const { variant = "transparent", size = "sm", className, ...otherProps } = props;
	return (
		<AriaButton
			{...otherProps}
			className={generateClassName(className, buttonColorsAccordingVariant[variant], buttonSize[size], "rounded-lg flex justify-center items-center gap-2")}
		/>
	);
};

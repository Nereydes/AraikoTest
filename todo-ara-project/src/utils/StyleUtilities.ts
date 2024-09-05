export function generateClassName(...classNames: (string | undefined)[]): string {
	return classNames.filter((value) => value).join(" ");
}

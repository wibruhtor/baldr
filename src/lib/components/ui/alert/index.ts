import { tv, type VariantProps } from "tailwind-variants";

export const alertVariants = tv({
	base: "relative w-full rounded-lg border px-4 py-3 text-sm overflow-hidden flex items-center gap-2",
	variants: {
		variant: {
			default: "bg-background text-foreground [&>svg]:text-foreground",
			destructive:
				"bg-background border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

export type Variant = VariantProps<typeof alertVariants>["variant"];
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

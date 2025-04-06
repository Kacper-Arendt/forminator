import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

export const SectionWrapper = ({
	name,
	children,
}: { name: string; children: ReactNode }) => {
	return (
		<div className="flex flex-col gap-y-2">
			{
				<div className="text-primary text-sm font-medium mb-2">
					{name}
					<Separator orientation="horizontal" />
				</div>
			}
			<div className="flex flex-col gap-3 p-2">{children}</div>
		</div>
	);
};

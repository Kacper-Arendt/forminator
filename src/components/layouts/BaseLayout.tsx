import type { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => (
	<div className="max-h-250 overflow-auto">{children}</div>
);

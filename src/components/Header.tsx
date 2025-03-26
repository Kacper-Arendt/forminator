import { Link } from "@tanstack/react-router";
import { appConfig } from "@/config/appConfig";
import type { ReactNode } from "react";

const NavItem = ({ to, children }: { to: string; children: ReactNode }) => (
	<Link
		to={to}
		className="text-base font-bold text-muted-foreground px-2 border-b-2"
		inactiveProps={{ className: "b-b-transparent" }}
		activeProps={{ className: "border-b-primary" }}
	>
		{children}
	</Link>
);

export default function Header() {
	return (
		<header className="p-3 bg-header-background">
			<nav className="flex flex-row gap-4">
				<NavItem to="/">{appConfig.name}</NavItem>
				<NavItem to="/settings">Settings</NavItem>
			</nav>
		</header>
	);
}

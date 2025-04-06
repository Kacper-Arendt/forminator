import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SectionWrapper } from "@/features/settings/components/SectionWrapper";
import { useTheme } from "@/features/settings/components/theme-provider";

export const AppSection = () => {
	const { setTheme } = useTheme();

	return (
		<SectionWrapper name="App">
			<Select onValueChange={setTheme}>
				<SelectTrigger className="w-fit min-w-[200px] ">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
					<SelectItem value="system">System</SelectItem>
				</SelectContent>
			</Select>
		</SectionWrapper>
	);
};

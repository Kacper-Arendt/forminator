import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SectionWrapper } from "@/features/settings/components/SectionWrapper";
import { useTheme } from "@/features/settings/components/theme-provider";
import { useAppConfig } from "@/features/settings/useAppConfig";

export const AppSection = () => {
	const { setTheme } = useTheme();
	const { disableSendStats, handleSendStatsChange } = useAppConfig();

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
			<div className="flex items-center space-x-2">
				<Checkbox
					id="stats"
					checked={disableSendStats}
					onCheckedChange={(x) => handleSendStatsChange(x as boolean)}
				/>
				<Label htmlFor="stats">Disable sending fill stats</Label>
			</div>
		</SectionWrapper>
	);
};

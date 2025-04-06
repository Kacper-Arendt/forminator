import { AppSection } from "@/features/settings/components/AppSection";
import { FormSection } from "@/features/settings/components/FormSection";

export const Settings = () => {
	return (
		<div className="flex flex-col gap-3">
			<AppSection />
			<FormSection />
		</div>
	);
};

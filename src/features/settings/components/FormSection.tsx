import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "@/features/settings/components/SectionWrapper";
import { useAppConfig } from "@/features/settings/useAppConfig";

export const FormSection = () => {
	const { domain, handleDomainChange } = useAppConfig();

	return (
		<SectionWrapper name="Form">
			<Label htmlFor="domain">Email domain</Label>
			<Input
				id="domain"
				name="domain"
				type="text"
				placeholder="formtripper.com"
				value={domain}
				onChange={handleDomainChange}
			/>
		</SectionWrapper>
	);
};

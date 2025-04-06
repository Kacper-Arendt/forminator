import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "@/features/settings/components/SectionWrapper";
import { useAppConfig } from "@/features/settings/useAppConfig";

export const FormSection = () => {
	const { domain, submitForm, handleDomainChange, handleSubmitFormChange } =
		useAppConfig();

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

			<div className="flex items-center space-x-2">
				<Checkbox
					id="terms"
					checked={submitForm}
					onCheckedChange={(x) => handleSubmitFormChange(x as boolean)}
				/>
				<Label htmlFor="terms">Submit form after fill</Label>
			</div>
		</SectionWrapper>
	);
};

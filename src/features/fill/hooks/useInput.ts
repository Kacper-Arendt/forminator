import {
	getEmail,
	getFirstName,
	getLastName,
	getPhoneNumber,
	getText,
} from "@/features/fill/helpers/randomText";

export const useInput = () => {
	const fillInput = (input: HTMLInputElement, value: string) => {
		try {
			input.focus();
			input.setAttribute("value", value);
			input.dispatchEvent(new Event("change", { bubbles: true }));
			input.dispatchEvent(new Event("blur", { bubbles: true }));
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	const sortInputs = (inputs: NodeListOf<HTMLInputElement>) => {
		const categorizedInputs = {
			text: [] as HTMLInputElement[],
			email: [] as HTMLInputElement[],
			phone: [] as HTMLInputElement[],
			other: [] as HTMLInputElement[],
		};

		inputs.forEach((input) => {
			switch (input.type) {
				case "email":
					categorizedInputs.email.push(input);
					break;
				case "tel":
					categorizedInputs.phone.push(input);
					break;
				case "text":
					categorizedInputs.text.push(input);
					break;
				default:
					categorizedInputs.other.push(input);
					break;
			}
		});

		return categorizedInputs;
	};

	const getTextForTextInput = (input: HTMLInputElement) => {
		try {
			switch (input.name) {
				case "phone":
				case "phone_number":
				case "phone-number":
					return getPhoneNumber();
				case "first_name":
				case "name":
				case "first-name":
				case "user-name":
				case "username":
					return getFirstName();

				case "last_name":
				case "surname":
				case "last-name":
					return getLastName();
				default:
					return getText();
			}
		} catch (e) {
			console.log(e);
			return getText();
		}
	};

	const fillInputs = (inputs: NodeListOf<HTMLInputElement>) => {
		try {
			if (!inputs || inputs?.length === 0) return null;

			const categorizedInputs = sortInputs(inputs);

			categorizedInputs.text.forEach((e) =>
				fillInput(e, getTextForTextInput(e)),
			);
			categorizedInputs.email.forEach((e) => fillInput(e, getEmail()));
			categorizedInputs.phone.forEach((e) => fillInput(e, getPhoneNumber()));
			categorizedInputs.other.forEach((e) => fillInput(e, getText()));
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	return { fillInputs };
};

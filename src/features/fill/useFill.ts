export const useFill = () => {
	// const getBrowserInstance = (): typeof chrome => {
	// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 	const browserInstance = window.chrome || (window as any).browser;
	// 	return browserInstance;
	// };

	const getCurrentTab = async () => {
		const queryOptions = { active: true, lastFocusedWindow: true };
		const [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	};

	const fillForm = async () => {
		try {
			const tab = await getCurrentTab();
			if (!tab?.id) {
				console.log("No tab found");
				return;
			}

			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => {
					const firstNames = ["John", "Jane", "Alice", "Bob", "Monika"];
					const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
					const phoneNumbers = [
						"1234567890",
						"9876543210",
						"5555555555",
						"4444444444",
					];
					const texts = ["Hello", "World", "Foo", "Bar"];

					const getRandomItem = (array: string[]) =>
						array[Math.floor(Math.random() * array.length)];

					const getText = (count = 2) => {
						const text = [];
						for (let i = 0; i < count; i++) {
							text.push(getRandomItem(texts));
						}
						return text.join(" ");
					};
					const getFirstName = () => getRandomItem(firstNames);
					const getLastName = () => getRandomItem(lastNames);
					const getPhoneNumber = () => getRandomItem(phoneNumbers);
					// const getEmail = (domain = "formtripper.com") => {
					// 	const firstName = getFirstName().toLowerCase();
					// 	const lastName = getLastName().toLowerCase();
					// 	return `${firstName}.${lastName}@${domain}`;
					// };

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

					const fillFileInput = (input: HTMLInputElement, name: string) => {
						try {
							const file = new File(
								[getText(10)],
								`${name ?? getText(1)}.txt`,
								{
									type: "text/plain",
								},
							);
							const dataTransfer = new DataTransfer();
							dataTransfer.items.add(file);
							input.files = dataTransfer.files;
							input.dispatchEvent(new Event("change", { bubbles: true }));
						} catch (e) {
							console.log(e);
							return null;
						}
					};

					const createUser = () => {
						const firstName = getFirstName();
						const lastName = getLastName();
						const fullName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
						const email = `${fullName}@formtripper.com`;
						const phoneNumber = getPhoneNumber();

						return {
							firstName,
							lastName,
							email,
							phoneNumber,
							fullName,
						};
					};

					const user = structuredClone(createUser());

					const sortInputs = (inputs: NodeListOf<HTMLInputElement>) => {
						const categorizedInputs = {
							text: [] as HTMLInputElement[],
							email: [] as HTMLInputElement[],
							phone: [] as HTMLInputElement[],
							file: [] as HTMLInputElement[],
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
								case "file":
									categorizedInputs.file.push(input);
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
									return user.phoneNumber;

								case "firstName":
								case "firstname":
								case "first_name":
								case "name":
								case "first-name":
								case "user-name":
								case "username":
									return user.firstName;

								case "lastName":
								case "last_name":
								case "surname":
								case "last-name":
									return user.lastName;
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
							categorizedInputs.email.forEach((e) => fillInput(e, user.email));
							categorizedInputs.phone.forEach((e) =>
								fillInput(e, user.phoneNumber),
							);
							categorizedInputs.other.forEach((e) => fillInput(e, getText()));
							categorizedInputs.file.forEach((e) =>
								fillFileInput(e, user.fullName),
							);
						} catch (e) {
							console.log(e);
							return null;
						}
					};

					const inputs = document.querySelectorAll("input");
					fillInputs(inputs);
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	return {
		fillForm,
	};
};

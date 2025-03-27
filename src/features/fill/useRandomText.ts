const firstNames = ["John", "Jane", "Alice", "Bob"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
const phoneNumbers = [
	"123-456-7890",
	"987-654-3210",
	"555-555-5555",
	"444-444-4444",
];
const texts = ["Hello", "World", "Foo", "Bar"];

export const useRandomText = () => {
	const getRandomItem = (array: string[]) =>
		array[Math.floor(Math.random() * array.length)];

	const getText = () => getRandomItem(texts);
	const getFirstName = () => getRandomItem(firstNames);
	const getLastName = () => getRandomItem(lastNames);
	const getPhoneNumber = () => getRandomItem(phoneNumbers);
	const getEmail = (domain = "formtripper.com") => {
		const firstName = getFirstName().toLowerCase();
		const lastName = getLastName().toLowerCase();
		return `${firstName}.${lastName}@${domain}`;
	};

	return {
		getFirstName,
		getLastName,
		getPhoneNumber,
		getEmail,
		getText,
	};
};

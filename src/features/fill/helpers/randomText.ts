import { firstNames } from "@/features/fill/helpers/data/firstNames";
import { lastNames } from "@/features/fill/helpers/data/lastNames";
import { phoneNumbers } from "@/features/fill/helpers/data/phoneNumbers";
import { texts } from "@/features/fill/helpers/data/texts";

const getRandomItem = (array: string[]) =>
	array[Math.floor(Math.random() * array.length)];

export const getText = () => getRandomItem(texts);

export const getFirstName = () => getRandomItem(firstNames);

export const getLastName = () => getRandomItem(lastNames);

export const getPhoneNumber = () => getRandomItem(phoneNumbers);

export const getEmail = (domain = "formtripper.com") => {
	const firstName = getFirstName().toLowerCase();
	const lastName = getLastName().toLowerCase();
	return `${firstName}.${lastName}@${domain}`;
};

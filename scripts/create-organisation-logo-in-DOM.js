export default function createOrganisationLogoInDOM() {
	const organisationLogoContainer = document.createElement("div");
	organisationLogoContainer.classList.add("organisation-logo-container");

	const textLogoFirstLetter = document.createElement("span");
	const textLogoFirstLine = document.createElement("span");
	const textLogoSecondLine = document.createElement("span");
	const imageLogo = document.createElement("img");

	textLogoFirstLetter.classList.add("text-logo-first-letter");
	textLogoFirstLine.classList.add("text-logo-first-line");
	textLogoSecondLine.classList.add("text-logo-second-line");
	imageLogo.classList.add("image-logo");

	textLogoFirstLetter.textContent = "T";
	textLogoFirstLine.textContent = "iger";
	textLogoSecondLine.textContent = "Tank";
	imageLogo.src = "../assets/image-logo.svg";

	organisationLogoContainer.appendChild(textLogoFirstLetter);
	organisationLogoContainer.appendChild(textLogoFirstLine);
	organisationLogoContainer.appendChild(textLogoSecondLine);
	organisationLogoContainer.appendChild(imageLogo);

	return organisationLogoContainer;
}

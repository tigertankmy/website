import createOrganisationLogoInDOM from "./create-organisation-logo-in-DOM.js";

const NAVIGATION_LINKS = {
	"/competition": [
		"Competition",
	],
	"/resources": [
		"Resources",
	],
	"/faq": [
		"FAQ",
	],
	"/sponsors-and-partners": [
		"Sponsors & Partners",
	],
};

// this <ul> contains all the navigation links
const ul = document.createElement("ul");

const homePageLink = document.createElement("a");
homePageLink.href = "/";

const organisationLogoContainer = createOrganisationLogoInDOM();
homePageLink.appendChild(organisationLogoContainer);

for (const [path, [name]] of Object.entries(NAVIGATION_LINKS)) {
	const li = document.createElement("li");
	if (window.location.pathname === path) li.classList.add("current-page");

	const img = document.createElement("span");
	img.classList.add(`${path.slice(1) || "home"}-icon`);
	img.classList.add("nav-link-icon");

	const a = document.createElement("a");
	a.href = path;

	const navLinkText = document.createElement("span");
	navLinkText.classList.add("nav-link-anchor-text");
	navLinkText.textContent = name;

	a.appendChild(img);
	a.appendChild(navLinkText);
	li.appendChild(a);
	ul.appendChild(li);
}

// this button is only visible on mobile (done in the stylesheet)
const buttonDropdownNavbarToggle = document.createElement("button");
buttonDropdownNavbarToggle.id = "button-dropdown-navbar-toggle";

// data attributes are being used here
// https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes
buttonDropdownNavbarToggle.dataset.dropdownVisible = "false";
ul.dataset.dropdownVisible = "false";

buttonDropdownNavbarToggle.addEventListener("click", () => {
	if (buttonDropdownNavbarToggle.dataset.dropdownVisible === "false") {
		buttonDropdownNavbarToggle.dataset.dropdownVisible = "true";
		ul.dataset.dropdownVisible = "true";
	} else {
		buttonDropdownNavbarToggle.dataset.dropdownVisible = "false";
		ul.dataset.dropdownVisible = "false";
	}
});

const nav = document.querySelector("nav");
nav.appendChild(homePageLink);
nav.appendChild(buttonDropdownNavbarToggle);
nav.appendChild(ul);

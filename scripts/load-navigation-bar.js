const NAVIGATION_LINKS = {
	"/": [
		"Home",
	],
	"/registration": [
		"Registration",
	],
	"/resources": [
		"Resources",
	],
	"/faq": [
		"FAQ",
	],
	"/sponsors-and-partners": [
		"Sponsors & partners",
	],
};

// this button is only visible on mobile (done in the stylesheet)
const buttonDropdownNavbarToggle = document.createElement("button");
buttonDropdownNavbarToggle.id = "button-dropdown-navbar-toggle";

const buttonText = document.createElement("span");
// destructure first element of array
[buttonText.textContent] = NAVIGATION_LINKS[window.location.pathname];
const currentPageIcon = document.createElement("span");
currentPageIcon.classList.add(`${window.location.pathname.slice(1) || "home"}-icon`);
currentPageIcon.classList.add("nav-link-icon");
const container = document.createElement("div");

container.appendChild(currentPageIcon);
container.appendChild(buttonText);

buttonDropdownNavbarToggle.appendChild(container);

// this <ul> contains all the navigation links
const ul = document.createElement("ul");

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
nav.appendChild(buttonDropdownNavbarToggle);
nav.appendChild(ul);

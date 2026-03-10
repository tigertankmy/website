const NAVIGATION_LINKS = {
	"/": [
		"Home",
		"/assets/icons/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	"/register": [
		"Register",
		"/assets/icons/checkbook_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	"/resources": [
		"Resources",
		"/assets/icons/books_movies_and_music_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	"/faq": [
		"FAQ",
		"/assets/icons/contact_support_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	"/sponsors-and-partners": [
		"Sponsors & partners",
		"/assets/icons/handshake_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
};

// this button is only visible on mobile (done in the stylesheet)
const buttonDropdownNavbarToggle = document.createElement("button");
buttonDropdownNavbarToggle.id = "button-dropdown-navbar-toggle";

const buttonText = document.createElement("span");
// destructure first element of array
[buttonText.textContent] = NAVIGATION_LINKS[window.location.pathname];

buttonDropdownNavbarToggle.appendChild(buttonText);

// this <ul> contains all the navigation links
const ul = document.createElement("ul");

for (const [path, [name]] of Object.entries(NAVIGATION_LINKS)) {
	const li = document.createElement("li");
	if (window.location.pathname === path) li.classList.add("current-page");

	const a = document.createElement("a");
	a.href = path;

	const span = document.createElement("span");
	span.classList.add("nav-link-anchor-text");
	span.textContent = name;

	a.appendChild(span);
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

// this button is only visible on mobile (done in the stylesheet)
const buttonDropdownNavbarToggle = document.getElementById("button-dropdown-navbar-toggle");

const ul = document.getElementById("navigation-list");

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

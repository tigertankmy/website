const links = [
	[
		"/",
		"Home",
		"./assets/icons/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	[
		"/register",
		"Register",
		"./assets/icons/checkbook_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	[
		"/resources",
		"Resources",
		"./assets/icons/books_movies_and_music_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	[
		"/faq",
		"FAQ",
		"./assets/icons/contact_support_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
	[
		"sponsors-and-partners",
		"Sponsors & partners",
		"./assets/icons/handshake_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
	],
];

const ul = document.createElement("ul");

for (const [href, name, iconPath] of links) {
	const li = document.createElement("li");
	const a = document.createElement("a");
	a.href = href;

	const img = document.createElement("img");
	img.classList.add("nav-link-icon");
	img.src = iconPath;

	const span = document.createElement("span");
	span.classList.add("nav-link-anchor-text");
	span.textContent = name;

	a.appendChild(img);
	a.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
}

const nav = document.querySelector("nav");
nav.appendChild(ul);

/* eslint-disable camelcase */
import createOrganisationLogoInDOM from "./create-organisation-logo-in-DOM.js";

const e = (element) => document.createElement(element);


const footerIntroContainer = e("div");
footerIntroContainer.id = "footer-intro-container";

const organisationLogoContainer = createOrganisationLogoInDOM();

const footerMottoContainer = e("div");
const footerMotto = e("span");
footerMotto.textContent = "Introducing entrepreneurship to Malaysian students.";
footerMottoContainer.appendChild(footerMotto);

const privacyPolicyLinkContainer = e("div");
const privacyPolicyLink = e("a");
privacyPolicyLink.href = "/privacy-policy";
privacyPolicyLink.textContent = "Privacy policy";
privacyPolicyLinkContainer.appendChild(privacyPolicyLink);

footerIntroContainer.appendChild(organisationLogoContainer);
footerIntroContainer.appendChild(footerMottoContainer);
footerIntroContainer.appendChild(privacyPolicyLinkContainer);


const contactUsContainer = e("div");

const contactUs_address = e("address");
const contactUs_dl = e("dl");

const contactUs_dt = e("dt");
contactUs_dt.classList.add("footer-heading");
contactUs_dt.textContent = "Contact us";
contactUs_dl.appendChild(contactUs_dt);

const contactUs_dd = e("dd");
const contactUs_ul = e("ul");

const email_li = e("li");
const emailLink = e("a");
emailLink.href = "mailto:tigertankmalaysia@gmail.com";
emailLink.textContent = "tigertankmalaysia@gmail.com";
email_li.appendChild(emailLink);
contactUs_ul.appendChild(email_li);

const phoneNumber_li = e("li");
const phoneNumberLink = e("a");
phoneNumberLink.href = "tel:+60166658769";
phoneNumberLink.textContent = "+60 16-665 8769";
const phoneNumberDescription = e("span");
phoneNumberDescription.textContent = " (Marcus Ong, Founder and Managing Director)";
phoneNumber_li.appendChild(phoneNumberLink);
phoneNumber_li.appendChild(phoneNumberDescription);
contactUs_ul.appendChild(phoneNumber_li);

contactUs_dd.appendChild(contactUs_ul);
contactUs_dl.appendChild(contactUs_dd);

contactUs_address.appendChild(contactUs_dl);
contactUsContainer.appendChild(contactUs_address);


const connectWithUsContainer = e("div");

const connectWithUs_address = e("address");
const connectWithUs_dl = e("dl");

const connectWithUs_dt = e("dt");
connectWithUs_dt.classList.add("footer-heading");
connectWithUs_dt.textContent = "Connect with us";
connectWithUs_dl.appendChild(connectWithUs_dt);

const connectWithUs_dd = e("dd");
const socialMediaList = e("ul");
socialMediaList.id = "social-media-list";

const socialMedias = {
	instagram: "https://instagram.com/tigertankmy",
	tiktok: "https://tiktok.com/@tigertankmy",
	linkedin: "https://linkedin.com/company/tiger-tank-malaysia",
};

for (const [socialMediaName, link] of Object.entries(socialMedias)) {
	const socialMedia_li = e("li");
	const socialMedia_a = e("a");
	socialMedia_a.href = link;
	socialMedia_a.dataset.icon = socialMediaName;

	socialMedia_li.appendChild(socialMedia_a);
	socialMediaList.appendChild(socialMedia_li);
}

connectWithUs_dd.appendChild(socialMediaList);
connectWithUs_dl.appendChild(connectWithUs_dd);

connectWithUs_address.appendChild(connectWithUs_dl);
connectWithUsContainer.appendChild(connectWithUs_address);


const footer = document.querySelector("footer");
footer.appendChild(footerIntroContainer);
footer.appendChild(contactUsContainer);
footer.appendChild(connectWithUsContainer);

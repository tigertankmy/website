/* eslint-disable no-loop-func */
import updateCanvas from "./scripts/updateCanvas.js";
// eslint-disable-next-line max-len
const DEFAULT_TEXTAREA_TEXT = `#Heading text begins with a hashtag (#)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum vehicula tristique. Vivamus est eros, mattis vitae arcu ac, accumsan commodo risus. Ut vitae luctus magna, eu placerat nisl. Vivamus non ante sodales, semper odio vitae, ultrices nisi.
Mauris posuere leo justo, non fringilla quam semper eu. In ipsum enim, malesuada a diam non, feugiat lacinia erat. Integer vel mi et nulla fringilla gravida non ac neque.
Nam iaculis, dolor ut efficitur semper, lectus diam rhoncus nulla, id consequat justo velit in lorem.
Nulla auctor eros ac diam accumsan pellentesque. Fusce ornare mi ex, vel egestas neque vulputate id. Quisque ut molestie felis, vel bibendum justo. Sed posuere magna auctor urna luctus, a condimentum leo consequat. Vestibulum vehicula tellus dapibus purus condimentum consectetur.


#Another heading!
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at urna porta, efficitur augue eget, tristique elit. Aliquam interdum efficitur metus. Aenean sit amet porta libero. Phasellus iaculis nulla sem. Aliquam laoreet vel ligula at porttitor. Donec dapibus lacinia erat nec hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus.`;
const DEFAULT_FONT_FAMILY = "Playfair Display";
const DEFAULT_FONT_SIZE = 42;
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1.2;
const DEFAULT_PARAGRAPH_SPACING = 42;
const DEFAULT_HORIZONTAL_PADDING = 100;
const DEFAULT_VERTICAL_PADDING = 150;

const DEFAULT_IMAGE_WIDTH = 1080;
const DEFAULT_IMAGE_HEIGHT = 1350;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "../assets/social-media-post-background.png";

let fontFamilyName = "";
const fontFamilyLoadStatus = document.getElementById("font-family-load-status");

// the values of every property (the HTML ids) will be replaced with a reference to its associated DOM element
const DOMelementsThatUpdateCanvasOnInput = {
	imageWidthInput: "image-width-input",
	imageHeightInput: "image-height-input",
	textArea: "text-input",
	fontFamilyInput: "font-family-input",
	fontSizeInput: "font-size-input",
	lineHeightMultiplierInput: "line-height-multiplier-input",
	paragraphSpacingInput: "paragraph-spacing-input",
	horizontalPaddingInput: "horizontal-padding-input",
	verticalPaddingInput: "vertical-padding-input",
};

for (const [elementName, htmlId] of Object.entries(DOMelementsThatUpdateCanvasOnInput)) {
	const element = document.getElementById(htmlId);

	let callback;

	if (htmlId === "image-width-input") {
		element.value = DEFAULT_IMAGE_WIDTH;
		callback = (ev) => {
			canvas.width = ev.target.value;
			updateCanvas(ctx, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else if (htmlId === "image-height-input") {
		element.value = DEFAULT_IMAGE_HEIGHT;
		callback = (ev) => {
			canvas.height = ev.target.value;
			updateCanvas(ctx, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else if (htmlId === "font-family-input") {
		element.value = DEFAULT_FONT_FAMILY;
		callback = (ev) => {
			fontFamilyName = ev.target.value;

			fontFamilyLoadStatus.classList.remove("font-active", "font-inactive");
			fontFamilyLoadStatus.classList.add("font-loading");
			fontFamilyLoadStatus.textContent = "loading font...";

			updateCanvas(ctx, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else {
		callback = () => {
			updateCanvas(ctx, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	}

	element.addEventListener("input", callback);

	DOMelementsThatUpdateCanvasOnInput[elementName] = element;
}

DOMelementsThatUpdateCanvasOnInput.textArea.value = DEFAULT_TEXTAREA_TEXT;
DOMelementsThatUpdateCanvasOnInput.fontSizeInput.value = DEFAULT_FONT_SIZE;
DOMelementsThatUpdateCanvasOnInput.horizontalPaddingInput.value = DEFAULT_HORIZONTAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.verticalPaddingInput.value = DEFAULT_VERTICAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.lineHeightMultiplierInput.value = DEFAULT_LINE_HEIGHT_MULTIPLIER;
DOMelementsThatUpdateCanvasOnInput.paragraphSpacingInput.value = DEFAULT_PARAGRAPH_SPACING;

window.addEventListener("load", () => {
	DOMelementsThatUpdateCanvasOnInput.fontFamilyInput.dispatchEvent(new Event("input"));
	DOMelementsThatUpdateCanvasOnInput.imageWidthInput.dispatchEvent(new Event("input"));
	DOMelementsThatUpdateCanvasOnInput.imageHeightInput.dispatchEvent(new Event("input"));
});

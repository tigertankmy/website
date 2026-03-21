/* eslint-disable no-loop-func */
import updateCanvas from "./scripts/updateCanvas.js";
// eslint-disable-next-line max-len
const DEFAULT_FONT_FAMILY = "Playfair Display";
const DEFAULT_FONT_SIZE = 50;
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1;
const DEFAULT_HORIZONTAL_PADDING = 100;
const DEFAULT_VERTICAL_PADDING = 200;

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
			updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else if (htmlId === "image-height-input") {
		element.value = DEFAULT_IMAGE_HEIGHT;
		callback = (ev) => {
			canvas.height = ev.target.value;
			updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else if (htmlId === "font-family-input") {
		element.value = DEFAULT_FONT_FAMILY;
		callback = (ev) => {
			fontFamilyName = ev.target.value;

			fontFamilyLoadStatus.classList.remove("font-active", "font-inactive");
			fontFamilyLoadStatus.classList.add("font-loading");
			fontFamilyLoadStatus.textContent = "loading font...";

			updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	} else {
		callback = () => {
			updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelementsThatUpdateCanvasOnInput);
		};
	}

	element.addEventListener("input", callback);

	DOMelementsThatUpdateCanvasOnInput[elementName] = element;
}

DOMelementsThatUpdateCanvasOnInput.fontSizeInput.value = DEFAULT_FONT_SIZE;
DOMelementsThatUpdateCanvasOnInput.horizontalPaddingInput.value = DEFAULT_HORIZONTAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.verticalPaddingInput.value = DEFAULT_VERTICAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.lineHeightMultiplierInput.value = DEFAULT_LINE_HEIGHT_MULTIPLIER;

backgroundImage.addEventListener("load", () => {
	DOMelementsThatUpdateCanvasOnInput.fontFamilyInput.dispatchEvent(new Event("input"));
	DOMelementsThatUpdateCanvasOnInput.imageWidthInput.dispatchEvent(new Event("input"));
	DOMelementsThatUpdateCanvasOnInput.imageHeightInput.dispatchEvent(new Event("input"));
});

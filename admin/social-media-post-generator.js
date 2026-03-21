// eslint-disable-next-line max-len
const DEFAULT_FONT_FAMILY_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap";
const DEFAULT_FONT_SIZE = 50;
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1;
const DEFAULT_HORIZONTAL_PADDING = 100;
const DEFAULT_VERTICAL_PADDING = 200;

const DEFAULT_IMAGE_WIDTH = 1080;
const DEFAULT_IMAGE_HEIGHT = 1350;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let fontFamilyName = "";


const backgroundImage = new Image();
backgroundImage.src = "../assets/social-media-post-background.png";

// the values of every property (the HTML ids) will be replaced with a reference to its associated DOM element
const DOMelementsThatUpdateCanvasOnInput = {
	textArea: "text-input",
	fontFamilyURLInput: "font-family-url-input",
	fontSizeInput: "font-size-input",
	lineHeightMultiplierInput: "line-height-multiplier-input",
	horizontalPaddingInput: "horizontal-padding-input",
	verticalPaddingInput: "vertical-padding-input",
};

function wrapParagraph(text, maxTextWidth) {
	const words = text.split(" ");

	const wrappedLines = [words[0]];

	// remove first word as it's already in lines
	words.shift();

	for (const word of words) {
		const currentLine = wrappedLines[wrappedLines.length - 1];

		const textMetrics = ctx.measureText(`${currentLine} ${word}`);

		if (textMetrics.width < maxTextWidth) {
			wrappedLines[wrappedLines.length - 1] += ` ${word}`;
		} else {
			wrappedLines.push(word);
		}
	}

	return wrappedLines;
}

function updateCanvas() {
	ctx.drawImage(backgroundImage, 0, 0);

	const textToBeDrawn = DOMelementsThatUpdateCanvasOnInput.textArea.value;
	const fontSize = parseInt(DOMelementsThatUpdateCanvasOnInput.fontSizeInput.value, 10);

	ctx.font = `${fontSize}px "${fontFamilyName}"`;

	console.log(ctx.font)

	const horizontalPadding = parseInt(DOMelementsThatUpdateCanvasOnInput.horizontalPaddingInput.value, 10);
	const maxTextWidth = canvas.width - (2 * horizontalPadding);

	const verticalPadding = parseInt(DOMelementsThatUpdateCanvasOnInput.verticalPaddingInput.value, 10);


	const wrappedLines = wrapParagraph(textToBeDrawn, maxTextWidth);

	const lineHeightMultiplier = parseFloat(DOMelementsThatUpdateCanvasOnInput.lineHeightMultiplierInput.value, 10);

	const lineHeightPx = fontSize * lineHeightMultiplier;

	for (const [index, line] of wrappedLines.entries()) {
		const yPosition = verticalPadding + index * lineHeightPx;
		ctx.fillText(line, horizontalPadding, yPosition, maxTextWidth);
	}
}

for (const [elementName, htmlId] of Object.entries(DOMelementsThatUpdateCanvasOnInput)) {
	const element = document.getElementById(htmlId);

	element.addEventListener("input", () => updateCanvas());
	DOMelementsThatUpdateCanvasOnInput[elementName] = document.getElementById(htmlId);
}

const detectedFontFamily = document.getElementById("detected-font-family");

DOMelementsThatUpdateCanvasOnInput.fontFamilyURLInput.addEventListener("input", () => {
	try {
		const url = new URL(DOMelementsThatUpdateCanvasOnInput.fontFamilyURLInput.value);

		// is an array containing strings like this: Playfair+Display:ital,wght@0,400..900;1,400..900
		const fullfontFamily = url.searchParams.get("family");

		// only take the first font
		[fontFamilyName] = fullfontFamily.split(":");


		detectedFontFamily.textContent = fontFamilyName;
	} catch (error) {
		console.error(error);

		detectedFontFamily.textContent = "the provided URL is invalid";
	}
});

const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

widthInput.addEventListener("input", (ev) => {
	canvas.width = ev.target.value;
	updateCanvas();
});
heightInput.addEventListener("input", (ev) => {
	canvas.height = ev.target.value;
	updateCanvas();
});

widthInput.value = DEFAULT_IMAGE_WIDTH;
heightInput.value = DEFAULT_IMAGE_HEIGHT;

widthInput.dispatchEvent(new Event("input"));
heightInput.dispatchEvent(new Event("input"));


DOMelementsThatUpdateCanvasOnInput.fontFamilyURLInput.value = DEFAULT_FONT_FAMILY_URL;
DOMelementsThatUpdateCanvasOnInput.fontSizeInput.value = DEFAULT_FONT_SIZE;
DOMelementsThatUpdateCanvasOnInput.horizontalPaddingInput.value = DEFAULT_HORIZONTAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.verticalPaddingInput.value = DEFAULT_VERTICAL_PADDING;
DOMelementsThatUpdateCanvasOnInput.lineHeightMultiplierInput.value = DEFAULT_LINE_HEIGHT_MULTIPLIER;

DOMelementsThatUpdateCanvasOnInput.fontFamilyURLInput.dispatchEvent(new Event("input"));

window.addEventListener("load", () => {
	updateCanvas();
});

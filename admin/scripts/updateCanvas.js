import wrapParagraphIntoLines from "./wrapParagraphIntoLines.js";

const canvasContainer = document.getElementById("canvas-container");
const fontFamilyLoadStatus = document.getElementById("font-family-load-status");

let lastFontLoadedTimestamp = Date.now();

function drawToCanvas(ctx, backgroundImage, fontFamilyName, DOMelements) {
	ctx.drawImage(backgroundImage, 0, 0);

	const textToBeDrawn = DOMelements.textArea.value;
	const fontSize = parseInt(DOMelements.fontSizeInput.value, 10);
	ctx.font = `${fontSize}px "${fontFamilyName}"`;

	const horizontalPadding = parseInt(DOMelements.horizontalPaddingInput.value, 10);
	const maxTextWidth = ctx.canvas.width - (2 * horizontalPadding);

	const verticalPadding = parseInt(DOMelements.verticalPaddingInput.value, 10);
	const availableHeightForText = ctx.canvas.height - (2 * verticalPadding);

	const lineHeightMultiplier = parseFloat(DOMelements.lineHeightMultiplierInput.value, 10);
	const lineHeightPx = fontSize * lineHeightMultiplier;

	const paragraphSpacing = parseInt(DOMelements.paragraphSpacingInput.value, 10);

	const paragraphs = textToBeDrawn.split("\n");

	let heightOfThisImagesTextSoFar = 0;

	for (const paragraph of paragraphs) {
		const wrappedLines = wrapParagraphIntoLines(ctx, paragraph, maxTextWidth);

		let heightAfterThisParagraph = heightOfThisImagesTextSoFar
			+ (wrappedLines.length * lineHeightPx) + paragraphSpacing;

		if (heightAfterThisParagraph > availableHeightForText) {
			heightOfThisImagesTextSoFar = 0;
			heightAfterThisParagraph = (wrappedLines.length * lineHeightPx) + paragraphSpacing;
			const newCanvas = ctx.canvas.cloneNode();
			canvasContainer.appendChild(newCanvas);

			ctx = newCanvas.getContext("2d");
			ctx.drawImage(backgroundImage, 0, 0);
			ctx.font = `${fontSize}px "${fontFamilyName}"`;
		}

		for (const [index, line] of wrappedLines.entries()) {
			const yPosition = verticalPadding + index * lineHeightPx + heightOfThisImagesTextSoFar;
			ctx.fillText(line, horizontalPadding, yPosition, maxTextWidth);
		}

		heightOfThisImagesTextSoFar = heightAfterThisParagraph;
	}
}

export default function updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelements) {
	while (canvasContainer.children.length > 1) {
		canvasContainer.removeChild(canvasContainer.lastChild);
	}

	const fontStartLoadTimestamp = Date.now();

	WebFont.load({
		google: {
			families: [fontFamilyName],
		},
		active: () => {
			lastFontLoadedTimestamp = Date.now();

			fontFamilyLoadStatus.classList.remove("font-loading", "font-inactive");
			fontFamilyLoadStatus.classList.add("font-active");
			fontFamilyLoadStatus.textContent = "font loaded successfully!";

			drawToCanvas(ctx, backgroundImage, fontFamilyName, DOMelements);
		},
		fontinactive: () => {
			// deal with the case where a font (e.g. "Roboto") has loaded successfully, but the previous font requests while the user was typing (e.g. "Rob", "Robo", "Robot") activate this callback
			if (fontStartLoadTimestamp <= lastFontLoadedTimestamp) return;

			fontFamilyLoadStatus.classList.remove("font-loading", "font-active");
			fontFamilyLoadStatus.classList.add("font-inactive");
			fontFamilyLoadStatus.textContent = "font could not be loaded.";
		},
	});
}

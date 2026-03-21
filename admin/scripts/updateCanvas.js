import wrapParagraphIntoLines from "./wrapParagraphIntoLines.js";

const HEADING_FONT_SIZE_MULTIPLIER = 2;

const canvasContainer = document.getElementById("canvas-container");
const fontFamilyLoadStatus = document.getElementById("font-family-load-status");

const backgroundImage = new Image();
backgroundImage.src = "../assets/social-media-post-background.png";

const imageLogo = new Image();
imageLogo.src = "../assets/image-logo.svg";

let lastFontLoadedTimestamp = Date.now();

function drawImageTemplate(ctx, cssFontValue, previousFontValue, fontSize, horizontalPadding, verticalPadding) {
	ctx.drawImage(backgroundImage, 0, 0);
	ctx.font = cssFontValue;

	ctx.fillText("@tigertankmy", horizontalPadding, verticalPadding);

	const imageWidth = fontSize * 5;
	// width-height ratio of the logo is 1.5 to 1
	const imageHeight = imageWidth / 1.5;

	ctx.drawImage(
		imageLogo,
		ctx.canvas.width - horizontalPadding - imageWidth,
		verticalPadding - (imageHeight / 3),
		imageWidth,
		imageHeight,
	);

	ctx.font = previousFontValue;
}

function drawToCanvas(ctx, fontFamilyName, DOMelements) {
	const textToBeDrawn = DOMelements.textArea.value;
	const fontSize = parseInt(DOMelements.fontSizeInput.value, 10);

	const cssFontValue = `${fontSize}px "${fontFamilyName}"`;

	const horizontalPadding = parseInt(DOMelements.horizontalPaddingInput.value, 10);
	const maxTextWidth = ctx.canvas.width - (2 * horizontalPadding);

	const verticalPadding = parseInt(DOMelements.verticalPaddingInput.value, 10);
	const availableHeightForText = ctx.canvas.height - (2 * verticalPadding);

	const lineHeightMultiplier = parseFloat(DOMelements.lineHeightMultiplierInput.value, 10);
	const normalLineHeightPx = fontSize * lineHeightMultiplier;

	const paragraphSpacing = parseInt(DOMelements.paragraphSpacingInput.value, 10);

	const textStartYPosition = fontSize * 4;

	const paragraphs = textToBeDrawn.split("\n");

	drawImageTemplate(ctx, cssFontValue, cssFontValue, fontSize, horizontalPadding, verticalPadding);

	let heightOfThisImagesTextSoFar = textStartYPosition;

	for (let paragraph of paragraphs) {
		let isHeading = false;
		let lineHeightPx = normalLineHeightPx;
		let fontValue = cssFontValue;
		if (paragraph.startsWith("#")) {
			isHeading = true;
			const headingFontSize = fontSize * HEADING_FONT_SIZE_MULTIPLIER;
			lineHeightPx = headingFontSize * lineHeightMultiplier;
			// remove hashtag
			paragraph = paragraph.slice(1);
			fontValue = `bold ${headingFontSize}px "${fontFamilyName}"`;
			ctx.font = fontValue;
			console.log(ctx.font)
		}

		const wrappedLines = wrapParagraphIntoLines(ctx, paragraph, maxTextWidth);

		let heightAfterThisParagraph = heightOfThisImagesTextSoFar
			+ (wrappedLines.length * lineHeightPx) + paragraphSpacing;

		// if there is insufficient space in the current image, create a new <canvas> element
		if (heightAfterThisParagraph > availableHeightForText) {
			heightOfThisImagesTextSoFar = textStartYPosition;
			heightAfterThisParagraph = textStartYPosition + (wrappedLines.length * lineHeightPx) + paragraphSpacing;
			const newCanvas = ctx.canvas.cloneNode();
			canvasContainer.appendChild(newCanvas);

			ctx = newCanvas.getContext("2d");
			drawImageTemplate(ctx, cssFontValue, fontValue, fontSize, horizontalPadding, verticalPadding);
			console.log(ctx.font)
		}

		for (const [index, line] of wrappedLines.entries()) {
			const yPosition = verticalPadding + index * lineHeightPx + heightOfThisImagesTextSoFar;
			ctx.fillText(line, horizontalPadding, yPosition, maxTextWidth);
		}

		if (isHeading === true) {
			ctx.font = cssFontValue;
			isHeading = false;
		}

		heightOfThisImagesTextSoFar = heightAfterThisParagraph;
	}
}

export default function updateCanvas(ctx, fontFamilyName, DOMelements) {
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

			drawToCanvas(ctx, fontFamilyName, DOMelements);
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

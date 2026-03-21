import wrapParagraphIntoLines from "./wrapParagraphIntoLines.js";

let lastFontLoadedTimestamp = Date.now();

export default function updateCanvas(ctx, backgroundImage, fontFamilyName, DOMelements) {
	const fontFamilyLoadStatus = document.getElementById("font-family-load-status");
	ctx.drawImage(backgroundImage, 0, 0);

	const textToBeDrawn = DOMelements.textArea.value;
	const fontSize = parseInt(DOMelements.fontSizeInput.value, 10);

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
			ctx.font = `${fontSize}px "${fontFamilyName}"`;

			const horizontalPadding = parseInt(DOMelements.horizontalPaddingInput.value, 10);
			const maxTextWidth = ctx.canvas.width - (2 * horizontalPadding);

			const verticalPadding = parseInt(DOMelements.verticalPaddingInput.value, 10);

			const wrappedLines = wrapParagraphIntoLines(ctx, textToBeDrawn, maxTextWidth);

			const lineHeightMultiplier = parseFloat(DOMelements.lineHeightMultiplierInput.value, 10);

			const lineHeightPx = fontSize * lineHeightMultiplier;

			for (const [index, line] of wrappedLines.entries()) {
				const yPosition = verticalPadding + index * lineHeightPx;
				ctx.fillText(line, horizontalPadding, yPosition, maxTextWidth);
			}
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

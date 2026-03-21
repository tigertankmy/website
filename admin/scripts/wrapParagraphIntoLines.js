export default function wrapParagraphIntoLines(ctx, text, maxTextWidth) {
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

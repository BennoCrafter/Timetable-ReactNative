
export function convertUnicodeToEmojis(text) {
    // Regular expression to match Unicode representations of emojis
    const unicodeRegex = /([\da-f]{4,5}|[\da-f]{8})/gi;
    
    return text.replace(unicodeRegex, (match) => {
        return String.fromCodePoint(parseInt(match, 16));
    });
}

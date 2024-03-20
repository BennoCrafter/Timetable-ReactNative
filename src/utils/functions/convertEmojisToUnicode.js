// thanks chatgpt for the regex!

export function convertEmojisToUnicode(text) {
    const emojiRegex = /\p{Emoji}/gu;

    // Replace emojis with Unicode representations
    return text.replace(emojiRegex, (match) => {
        return match.codePointAt(0).toString(16);
    });
}
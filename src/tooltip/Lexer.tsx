const text = 'text';
type text = typeof text;

const highlight = 'highlight';
type highlight = typeof highlight;

const whitespace = 'whitespace';
type whitespace = typeof whitespace;

type TokenType = text | highlight | whitespace;

export interface Token {
    type: TokenType
    value: string
}

export function lexer(input: string): String[] {
    const tokens = new Array<String>();

    let startIndex = -1;
    let currentIndex = 0;
    let insideWord = false;
    while (currentIndex < input.length) {
        const currentChar = input[currentIndex];
        let isWhitespace = /^\s+$/.test(currentChar);
        if (isWhitespace && insideWord) {
            const nextTokenValue = input.substr(startIndex, currentIndex - startIndex);
            tokens.push(nextTokenValue);
            startIndex = currentIndex;
            insideWord = false;
        } else if (isWhitespace && !insideWord) {

        } else if (!isWhitespace && insideWord) {

        } else if (!isWhitespace && !insideWord) {
            if (startIndex == -1) {
                startIndex = 0;
            } else {
                const nextTokenValue = input.substr(startIndex, currentIndex - startIndex);
                tokens.push(nextTokenValue);
                startIndex = currentIndex;
            }
            insideWord = true;
        }
        currentIndex++;
    }

    if (currentIndex > startIndex) {
        tokens.push(input.substr(startIndex, currentIndex - startIndex));
    }

    return tokens;
}
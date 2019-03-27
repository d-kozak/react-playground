export const text = 'text';
export type text = typeof text;

export const highlight = 'highlight';
export type highlight = typeof highlight;

export const whitespace = 'whitespace';
export type whitespace = typeof whitespace;

type TokenType = text | highlight | whitespace;

export interface Token {
    type: TokenType
    value: string
}

export function analyzeTokens(tokens: String[], set: Set<String>): Array<Token> {
    return tokens.map(token => {
        let value = token;
        if (/^\s+$/.test(token)) {
            return {type: whitespace, value}
        } else {
            return {type: text, value}
        }
    });
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
export type Token = TextToken | WhitespaceToken | HightLightToken;

export interface TextToken {
    type: "text"
    value: string
}

export interface WhitespaceToken {
    type: "whitespace",
    value: string
}

export interface HightLightToken {
    type: "highlight",
    value: string
}


export function serializeTokens(tokens: Array<Token>): string {
    return tokens.map(token => {
            switch (token.type) {
                case "text":
                case "whitespace":
                    return token.value;
                case "highlight":
                    return `<b>${token.value}</b>`;
            }
        }
    ).reduce((left, right) => left + right);
}

export function analyzeTokens(tokens: string[], set: Set<string>): Array<Token> {
    return tokens.map(token => {
        if (/^\s+$/.test(token)) {
            const tkn: Token = {type: "whitespace", value: token};
            return tkn
        } else if (set.has(token)) {
            const tkn: Token = {type: "highlight", value: token};
            return tkn
        } else {
            const tkn: Token = {type: "text", value: token};
            return tkn
        }
    });
}

export function lexer(input: string): string[] {
    const tokens = new Array<string>();

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
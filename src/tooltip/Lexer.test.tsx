import {analyzeTokens, lexer, serializeTokens, Token} from "./Lexer";

it('testing typeof', () => {
    const dog = 'dog';
    const dogType = typeof dog;

    const cat = 'cat';
    const catType = typeof cat;

    expect(dogType == catType).toBe(true);
    expect(dogType === catType).toBe(true);

    expect(dogType != catType).toBe(false);
    expect(dogType !== catType).toBe(false);

    // typeof 'str1' == typeof 'str2'
});


it('set behaviour', () => {
    const set = new Set([1, 2, 3]);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    expect(set.has(3)).toBe(true);
    expect(set.has(4)).toBe(false);

});

it('testing expect in jest', () => {
    expect(['a']).toEqual(expect.arrayContaining(['a']));
    expect(['a', 'b']).toEqual(expect.arrayContaining(['a', 'b']));
    expect(['a', 'b']).not.toEqual(expect.arrayContaining(['b', 'a', 'c']));

    expect(['a', 'b']).toEqual(['a', 'b']);
    expect(['a', 'b']).not.toEqual(['b', 'a']);
});


it('exploring tokens', () => {
    const highlight: Token = {
        type: "highlight",
        value: "str"
    };
    console.log(highlight);

    const text: Token = {
        type: "text",
        value: "str2"
    };
    console.log(text);

});

it('simple lexing', () => {
    const tokens = lexer('hello I  am    David!');
    expect(tokens).toEqual(['hello', ' ', 'I', '  ', 'am', '    ', 'David!']);
});

it('more complex lexing', () => {
    const tokens = lexer('and who are you, the proud lord says, that I must bow so low?');
    expect(tokens).toEqual(['and', ' ', 'who', ' ', 'are', ' ', 'you,', ' ', 'the', ' ', 'proud', ' ', 'lord', ' ', 'says,', ' ', 'that', ' ', 'I', ' ', 'must', ' ', 'bow', ' ', 'so', ' ', 'low?']);
});


it('simple analysis - no highlights', () => {
    const analyzedTokens = analyzeTokens(lexer('hello I'), new Set());
    expect(analyzedTokens).toMatchObject(
        [
            {
                type: "text",
                value: 'hello'
            },
            {
                type: "whitespace",
                value: ' '
            },
            {
                type: "text",
                value: 'I'
            }
        ]
    );
});

it('bigger analysis - no highlights', () => {
    const analyzedTokens = analyzeTokens(lexer('hello I  am    David!'), new Set());
    expect(analyzedTokens).toMatchObject(
        [
            {
                type: "text",
                value: 'hello'
            },
            {
                type: "whitespace",
                value: ' '
            },
            {
                type: "text",
                value: 'I'
            },
            {
                type: "whitespace",
                value: '  '
            },
            {
                type: "text",
                value: 'am'
            },
            {
                type: "whitespace",
                value: '    '
            },
            {
                type: "text",
                value: 'David!'
            }
        ]
    );
});


it('simple analysis - highlight cat', () => {
    const analyzedTokens = analyzeTokens(lexer('A cat and a dog went on a long walk together'), new Set(['cat']));
    expect(analyzedTokens).toMatchObject([{type: 'text', value: 'A'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'cat'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'and'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'dog'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'went'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'on'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'long'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'walk'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'together'}]);
});

it('simple analysis - highlight cat and dog', () => {
    const analyzedTokens = analyzeTokens(lexer('A cat and a dog went on a long walk together'), new Set(['cat', 'dog']));
    expect(analyzedTokens).toMatchObject([{type: 'text', value: 'A'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'cat'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'and'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'dog'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'went'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'on'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'long'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'walk'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'together'}]);
});

it('simple analysis - highlight cat and walk', () => {
    const analyzedTokens = analyzeTokens(lexer('A cat and a dog went on a long walk together'), new Set(['cat', 'dog', 'walk']));
    expect(analyzedTokens).toMatchObject([{type: 'text', value: 'A'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'cat'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'and'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'dog'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'went'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'on'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'a'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'long'},
        {type: 'whitespace', value: ' '},
        {type: 'highlight', value: 'walk'},
        {type: 'whitespace', value: ' '},
        {type: 'text', value: 'together'}]);
});

it('serialize tokens - no highlights', () => {
    let input = 'Byl jeden pan, ten kozla mel.';
    const tokens = analyzeTokens(lexer(input), new Set());
    const output = serializeTokens(tokens);
    expect(output).toBe(input);
});

it('serialize tokens - highlight pan', () => {
    let input = 'Byl jeden pan, ten kozla mel.';
    const tokens = analyzeTokens(lexer(input), new Set(['pan,']));
    const output = serializeTokens(tokens);
    const expected = 'Byl jeden <b>pan,</b> ten kozla mel.';
    expect(output).toBe(expected);
});
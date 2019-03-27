import {analyzeTokens, lexer, text, whitespace} from "./Lexer";

it('testing typeof', () => {
    const dog = 'dog';
    const dogType = typeof dog;

    const cat = 'cat';
    const catType = typeof cat;

    // both true
    console.log(dogType == catType);
    console.log(dogType === catType);

    // both false
    console.log(dogType != catType);
    console.log(dogType !== catType);

    // typeof 'str1' == typeof 'str2'
});


it('testing expect in jest', () => {
    expect(['a']).toEqual(expect.arrayContaining(['a']));
    expect(['a', 'b']).toEqual(expect.arrayContaining(['a', 'b']));
    expect(['a', 'b']).not.toEqual(expect.arrayContaining(['b', 'a', 'c']));

    expect(['a', 'b']).toEqual(['a', 'b']);
    expect(['a', 'b']).not.toEqual(['b', 'a']);
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
    const analyzedTokens = analyzeTokens(lexer('hello I'), new Set<String>());
    expect(analyzedTokens).toMatchObject(
        [
            {
                type: text,
                value: 'hello'
            },
            {
                type: whitespace,
                value: ' '
            },
            {
                type: text,
                value: 'I'
            }
        ]
    );
});

it('bigger analysis - no highlights', () => {
    const analyzedTokens = analyzeTokens(lexer('hello I  am    David!'), new Set<String>());
    expect(analyzedTokens).toMatchObject(
        [
            {
                type: text,
                value: 'hello'
            },
            {
                type: whitespace,
                value: ' '
            },
            {
                type: text,
                value: 'I'
            },
            {
                type: whitespace,
                value: '  '
            },
            {
                type: text,
                value: 'am'
            },
            {
                type: whitespace,
                value: '    '
            },
            {
                type: text,
                value: 'David!'
            }
        ]
    );
});


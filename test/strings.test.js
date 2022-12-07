import Add from '../src/strings';

describe('Step 1', () => {
    it('Sum of empty string', () => {
        const input = '';
        expect(Add(input)).toBe(0);
    })

    it('Sum of 1 string number', () => {
        const input = '1';
        expect(Add(input)).toBe(1);
    })

    it('Sum of 2 string numbers', () => {
        const input = '1,2';
        expect(Add(input)).toBe(3);
    })
});

describe('Step 2', () => {
    it('Allow to handle an unknown amount of numbers', () => {
        const input = '1,2,3,4,5';
        expect(Add(input)).toBe(15);
    })
});

describe('Step 3', () => {
    it('Calling Add with negative number will throw an exception and the negative values', () => {
        const input = '1,2,3,4,-5,-8';
        try {
            Add(input);
            expect(true).toBe(false); // Fail test if expression doesn't throw anything
         } catch (e) {
             expect(e.message).toBe('Negatives not allowed: -5, -8');  // Error('Negatives not allowed')
         }
    })
});

describe('Step 4', () => {
    it('Numbers bigger than 1000 should be ignored', () => {
        const input = '1,2,3,4,5,1001,500';
        expect(Add(input)).toBe(515);
    })
});


describe('Step 5', () => {
    it('Support different delimiters. Delimiters can be of any length', () => {
        const input = '//[***]//1***2***3';
        expect(Add(input)).toBe(6);
    })
});

describe('Step 6', () => {
    it('Allow multiple delimiters', () => {
        const input = '//[*][%]//1*2%3';
        expect(Add(input)).toBe(6);
    })
});

describe('Step 7', () => {
    it('Make sure you can also handle multiple delimiters with length longer than one char', () => {
        const input = '//[*][%]//+###1*****2%%%?3()()5';
        expect(Add(input)).toBe(11);
    })
});
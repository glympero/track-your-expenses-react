const add = (a, b) => a + b;
const generateGreeting = (name='Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(1,3);
    expect(result).toBe(4);
});

test('should generate greeting from name', () => {
    const result = generateGreeting('George');
    expect(result).toBe('Hello George!');
});

test('should generate greeting without name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
});
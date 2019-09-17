import { msToTime, formatNumber, addBrackets, separateByComma } from "./utils.js"

test('format 1 to 01', () => {
    expect(formatNumber(1, "00")).toBe("01");
});

test('format 10 to 10', () => {
    expect(formatNumber(10, "00")).toBe("10");
});

test('format 100 to 100', () => {
    expect(formatNumber(100, "00")).toBe("100");
});

test('format 60000ms to 00:01', () => {
    expect(msToTime(60000)).toBe("00:01");
});

test('format 1000ms to 00:00:01', () => {
    expect(msToTime(1000)).toBe("00:00:01");
});

test('format 60001ms to 00:01:00:01', () => {
    expect(msToTime(60001)).toBe("00:01:00:01");
});

test('format 7200000ms to 02:00', () => {
    expect(msToTime(7200000)).toBe("02:00");
});

test('addBrackets to a simple string', () => {
    expect(addBrackets("a bc")).toBe("[a bc]");
});

test('separateByComma - simple', () => {
    const input = `{a}{b} {c}
{d}`;
    expect(separateByComma(input)).toBe("{a},{b},{c},{d}");
});

test('separateByComma - example', () => {
    const input = `{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}`;

    expect(separateByComma(input)).toBe(`{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']},{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}`);
});
import generateChart from './generateChart';
import defaultOptions from './defaultOptions';

const exampleOutput = { "credits": { "enabled": false }, "legend": { "align": "right", "itemDistance": 50, "itemStyle": { "textTransform": "capitalize" }, "layout": "vertical", "verticalAlign": "top" }, "plotOptions": { "series": { "label": { "connectorAllowed": false }, "marker": { "lineWidth": 1, "radius": 7, "symbol": "circle" } } }, "series": [{ "data": [null, [0.2]], "name": " linux chrome min response time", "pointPlacement": "on" }, { "data": [null, [0.9]], "name": " linux chrome max response time", "pointPlacement": "on" }, { "data": [null, [0.1]], "name": " mac chrome min response time", "pointPlacement": "on" }, { "data": [null, [1]], "name": " mac chrome max response time", "pointPlacement": "on" }, { "data": [null, [0.2]], "name": " mac firefox min response time", "pointPlacement": "on" }, { "data": [null, [1.1]], "name": " mac firefox max response time", "pointPlacement": "on" }, { "data": [null, [0.3]], "name": " linux firefox min response time", "pointPlacement": "on" }, { "data": [null, [1.4]], "name": " linux firefox max response time", "pointPlacement": "on" }], "title": { "text": "" }, "xAxis": { "categories": ["NaN:NaN", "00:01"], "min": 0, "tickmarkPlacement": "on" }, "yAxis": { "labels": false, "title": false } };

test('example - json input', () => {
    const input = `[
        {"type": "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]},
        {"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000},
        {"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3},
        {"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 1.2},
        {"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.2},
        {"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "firefox", "min_response_time": 0.1, "max_response_time": 1.0},
        {"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 0.9},
        {"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.0},
        {"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "firefox", "min_response_time": 0.2, "max_response_time": 1.1},
        {"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.4},
        {"type": "stop", "timestamp": 1519862460000}
    ]`;

    expect(generateChart(input, defaultOptions)).toEqual(exampleOutput);
});

test('example - custom format input - with comma and []', () => {
    const input = `[
        {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']},
        {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
        {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3},
        {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2},
        {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2},
        {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0},
        {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9},
        {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0},
        {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1},
        {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4},
        {type: 'stop', timestamp: 1519862460000}
    ]`;

    expect(generateChart(input, defaultOptions)).toEqual(exampleOutput);
});

test('example - custom format input - with []', () => {
    const input = `[
    {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
    {type: 'stop', timestamp: 1519862460000}        
    ]`;

    expect(generateChart(input, defaultOptions)).toEqual(exampleOutput);
});

test('example - custom format input - with comma', () => {
    const input = `
    {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']},
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3},
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2},
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2},
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0},
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9},
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0},
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1},
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4},
    {type: 'stop', timestamp: 1519862460000}        
    `;

    expect(generateChart(input, defaultOptions)).toEqual(exampleOutput);
});

test('example - custom format input', () => {
    const input = `
    {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
    {type: 'stop', timestamp: 1519862460000}        
    `;

    expect(generateChart(input, defaultOptions)).toEqual(exampleOutput);
});

test('no input', () => {
    const input = '';

    expect(() => generateChart(input, defaultOptions)).toThrow();
});

test('unformat input', () => {
    const input = 'test unformat input';

    expect(() => generateChart(input, defaultOptions)).toThrow();
});
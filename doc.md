# Anny's challenge
I used ReactJS framework to build the application, and it's expected to work on Chrome, Firefox, Edge and IE11. It also supports both JSON and the custom format discussed in challenge's README.

## Run the aplication
```
$ yarn
$ yarn start
```

## Change layout and clean data
My solution also provides two buttons at the top right corner.

The rightmost is a simple clean button, that should clean data from text area, chart area and error area.
![error button](https://uploaddeimagens.com.br/images/002/353/175/full/errorButton.png?1568750259)

The other one allows the user to change the layout of the application:
![change layout](https://uploaddeimagens.com.br/images/002/353/170/full/changeLayout.png?1568750218)
Since I'm using display flex, this button basically changes a flex-direction property. It also toggles a state variable so that the readjust bar works property.

## Chart and Text area
To display the chart, I used [Highcharts](https://www.highcharts.com/). More specifically, the wrapper [highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official). The Highchart component provided by this wrapper, expects an object with data, series and some configuration. This object is manipulated by `generateChart` function when the button `GENERATED CHART` is clicked.

> `generateChart` function is located at `src/components/Main/generateChart/generateChart.js`. 

For the text input, I used [CodeMirror](https://codemirror.net/) and the package [react-codemirror2](https://www.npmjs.com/package/react-codemirror2). A custom theme (`src/components/Main/codemirror-theme.css`) was created to match the one used at challenge's README. Although I'm using Styled Componets at this challenge, I decided to create a simple `.css` file to match the CodeMirror component requirements.

> CodeMirror component expects to receive the theme name through a property, and this name should match the .css filename


## JSON and custom data
I created the function `generateChart` to converts the read value from text area to an object. This object is latter used to generate the chart. 

To support JSON inputs, I could simply use JSON.parse to convert the string to a JavaScript object and then manipulate it. To support the custom format, I used JSON5, a JavaScript library that provides supports to a supper set of JSON. This library, by itself, can parse a string like the following:

```
[
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
]
```

So, to support the custom format proposed, I used regex to add brackets and commas if necessary.

## Display flex and readjust bar
My challenge's layout uses display flex to organize the header, text area, readjust bar, chart area and bottom bar in a column display (one below the other) by default. Since I'm using the css property justify-content equals 'space-between', the bottom bar already keeps located at the bottom of its wrapper. The width and height of the text area and chart area are controlled by a custom JavaScript code, that observes window resize events and mouse click and movements to adjust the application to the window size and user desired layout.

## Main component offSets
All the logic of my solution is located at the Main component. Trying to improve its reusability, it expects to receive the offsets (Top, Right, Bottom and Left) to the window limits. By default, all of these offsets are equal 0 since this component occupies all the window. Setting the offsets to 100px generates the following:
![offSets](https://uploaddeimagens.com.br/images/002/353/451/full/offSet.png?1568754181)

Note that these offsets should corresponds to the layout. In this case, the wrapper div has a padding of 100px.


## Tests
I create tests for important functions of my solution. These are the created tests:
- ```src/components/Main/util/utils.test.js```
- ```src/components/Main/generateChart/generateChart.test.js```

However, all tests only verify a function. It would be better to test the entire Main component, not only some functions. I wanted to create tests to enter events at text area, fire the GENERATE CHART button and expect changes at error or chart area. But I faced some problems trying to test while using react-codemirror2. As far as I could understand, react-codemirror2 uses 'createTextRange', which is not provided by jest. I even found some discussions about this ([an example](https://stackoverflow.com/questions/21572682/createtextrange-is-not-working-in-chrome/46424247#46424247)), but couldn't solve the problem.


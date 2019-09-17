import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Component } from 'react';
import { FiColumns, FiTrash2 } from "react-icons/fi";
import { FaSpinner } from 'react-icons/fa';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import defaultOptions from './generateChart/defaultOptions';

import { Controlled as CodeMirror } from 'react-codemirror2';
import './codemirror-theme.css';

import { Container, Content, ReadjustBar, Box, Bar, Button, ErrorMessage } from './styles';
import generateChart from './generateChart/generateChart';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript.js');

export default class Main extends Component {
    codeMirrorInstance = null;
    highChartPadding = 20;
    barHeight = 72;

    chartComponent = React.createRef();

    state = {
        loading: false,
        contentHeight: 0,
        contentWidth: 0,
        maxX: 0,
        maxY: 0,
        handlerX: 0,
        handlerY: 0,
        value: '',
        clientY: 0,
        direction: 'column',
        errorMessage: '',
        options: defaultOptions
    };

    updateChartHeight(handler) {
        const highChart = this.chartComponent.current.container.current;

        if (this.state.direction === 'row') {
            this.setState({ handlerX: handler });

            var pointerRelativeXpos = handler - this.props.offSetLeft;
            var minX = 0;

            var x = (Math.min(Math.max(minX, pointerRelativeXpos), this.state.maxX - this.props.offSetLeft));

            this.codeMirrorInstance.setSize(x + 'px', this.contentHeight + 'px');

            highChart.style.width = (this.contentWidth - x - 20 - (this.highChartPadding * 2)) + 'px';
            highChart.style.height = this.contentHeight + 'px';

        } else {
            this.setState({ handlerY: handler });

            var pointerRelativeYpos = handler - this.props.offSetTop - this.barHeight;
            var minY = 0;

            var y = (Math.min(Math.max(minY, pointerRelativeYpos), this.state.maxY - this.barHeight - this.props.offSetTop));

            this.codeMirrorInstance.setSize(this.contentWidth + 'px', y + 'px');

            highChart.style.height = (this.contentHeight - y - 13) + 'px';
            highChart.style.width = this.contentWidth - this.highChartPadding * 2 + 'px';
        }

        this.chartComponent.current.chart.reflow();
    }

    updateContentSize_calcs() {
        this.contentHeight = window.innerHeight - this.props.offSetTop - this.props.offSetBottom - this.barHeight * 2;
        this.contentWidth = window.innerWidth - this.props.offSetLeft - this.props.offSetRight;

        var maxX = (this.contentWidth / 2) + this.props.offSetLeft;
        var maxY = (this.contentHeight / 2) + this.props.offSetTop + this.barHeight;

        this.setState({ maxX: maxX });
        this.setState({ maxY: maxY });

        return { maxX, maxY };
    }

    updateContentSize() {
        this.updateContentSize_calcs();

        this.updateChartHeight((this.state.direction === 'row') ? this.state.handlerX : this.state.handlerY);
    }

    componentWillMount() {
        var obj = this.updateContentSize_calcs();

        this.setState({ handlerX: obj.maxX });
        this.setState({ handlerY: obj.maxY });
    }

    componentDidMount() {
        this.updateChartHeight((this.state.direction === 'row') ? this.state.handlerX : this.state.handlerY);
        window.addEventListener("resize", this.updateContentSize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateContentSize.bind(this));
    }

    render() {
        return (
            <Container>
                <Bar height={`${this.barHeight}px`}>
                    <div>
                        Anny's Challenge
                    </div>
                    <div>
                        <Button
                            direction={this.state.direction}
                            onClick={() => {

                                if (this.state.direction === 'column') {
                                    this.setState({ direction: 'row' }, () => {
                                        this.updateContentSize();
                                    });
                                } else {
                                    this.setState({ direction: 'column' }, () => {
                                        this.updateContentSize();
                                    });
                                }
                            }}>
                            <FiColumns />
                        </Button>
                        <Button
                            onClick={() => {
                                this.setState({ errorMessage: '' });

                                var options = this.state.options;
                                options.xAxis.categories = [];
                                options.series = [];
                                this.setState({ options });

                                this.setState({ value: '' });

                            }}
                        >
                            <FiTrash2 />
                        </Button>
                    </div>
                </Bar>

                <Content
                    className="content"
                    direction={this.state.direction}
                >
                    <CodeMirror
                        value={this.state.value}
                        editorDidMount={editor => { this.codeMirrorInstance = editor }}
                        options={{
                            mode: 'javascript',
                            theme: 'codemirror-theme',
                            lineNumbers: true,
                            autosave: true
                        }}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ value });
                        }}
                        onChange={(editor, data, value) => {

                        }}
                    />

                    <ReadjustBar
                        direction={this.state.direction}
                        onMouseDown={e => {
                            var isReadjustBarDragging = true;

                            window.addEventListener('mousemove', e => {
                                if (isReadjustBarDragging) {
                                    e.preventDefault();
                                    this.updateChartHeight((this.state.direction === 'row') ? e.clientX : e.clientY);
                                    document.body.style.cursor = (this.state.direction === 'row') ? 'ew-resize' : 'ns-resize';
                                }
                            });

                            window.addEventListener('mouseup', e => {
                                isReadjustBarDragging = false;
                                document.body.style.cursor = 'auto';
                            })
                        }}
                    >
                        <div className="line"></div>
                        <div className="box">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="line"></div>
                    </ReadjustBar>

                    <Box padding={this.highChartPadding}>
                        <HighchartsReact
                            ref={this.chartComponent}
                            highcharts={Highcharts}
                            options={this.state.options}
                            reflow={false}
                            updateArgs={[true, true, true]}
                        />
                    </Box>
                </Content>

                <Bar height={`${this.barHeight}px`}>
                    <Button
                        loading={this.state.loading}
                        disabled={this.state.value === ''}
                        onClick={() => {
                            this.setState({ loading: true });

                            setTimeout(() => {
                                try {
                                    this.setState({ options: generateChart(this.state.value, this.state.options) });
                                    this.setState({ errorMessage: '' });
                                }
                                catch (error) {
                                    var options = this.state.options;
                                    options.xAxis.categories = [];
                                    options.series = [];
                                    this.setState({ options });

                                    this.setState({ errorMessage: 'an error has occured while generating the chart' });
                                }
                                finally {
                                    this.setState({ loading: false });

                                }
                            }, 1000);
                        }}>

                        {this.state.loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                                <> generate chart</>
                            )}
                    </Button>
                    <ErrorMessage>
                        {this.state.errorMessage}
                    </ErrorMessage>
                </Bar>
            </Container >
        );
    }
}
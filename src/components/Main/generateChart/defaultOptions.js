const defaultOptions = {
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
        tickmarkPlacement: 'on'
    },
    yAxis: {
        title: false,
        labels: false
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            marker: {
                symbol: 'circle',
                radius: 7,
                lineWidth: 1
            }
        }
    },
    credits: {
        enabled: false
    },
    legend: {
        layout: 'vertical',
        itemStyle: {
            textTransform: 'capitalize',
        },
        align: 'right',
        itemDistance: 50,
        verticalAlign: 'top'
    },
    series: []
};

export default defaultOptions;
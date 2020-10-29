<script>
import {
    Bar
} from 'vue-chartjs'

export default {
    extends: Bar,
    props: {
        data: {
            type: Array,
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            suggest: 200,
        }
    },
    watch: {
        'data': function (res) {
            this.chartRender()
        }
    },
    methods: {
        chartRender() {
            this.renderChart({
                labels: this.labels,
                datasets: [{
                    backgroundColor: '#4285C2',
                    data: this.data,
                }]
            }, {
                "hover": {
                    "animationDuration": 0
                },
                "animation": {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                legend: {
                    display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: this.suggest,
                            callback: function (value) {
                                var ranges = [{
                                        divider: 1e6,
                                        suffix: 'M'
                                    },
                                    {
                                        divider: 1e3,
                                        suffix: 'k'
                                    }
                                ];

                                function formatNumber(n) {
                                    for (var i = 0; i < ranges.length; i++) {
                                        if (n >= ranges[i].divider) {
                                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                        }
                                    }
                                    return n;
                                }
                                return formatNumber(value);
                            }
                        }
                    }],
                },
            });
        }
    },
    mounted() {
        this.chartRender()
    }
}
</script>

import { onlyUniqueArrayValues, convertLabelsToTile, getDEXEsNames, dynamicColors } from './myjs.js'
import { ethers } from 'ethers';


// INDIVIDUAL stats

export function enablePrice30dChart(charts, projectInfoCov) {

    for (let pair = 0; pair < charts.length; pair++) {
        const thisChart = Chart.getChart(charts[pair]);
        if (thisChart) {// Reseting the chart if called again
            thisChart.destroy();
        }
        var ctx7 = document.getElementById(charts[pair]).getContext("2d");

        var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        // Axies
        var daysArray = new Array();
        var volsArray = new Array();
        var maxVol = 0;
        var unitVol = 0;

        // Data
        var liquiditySeries30d = new Array();

        for (let index = 0; index < projectInfoCov[pair].price_timeseries_30d.length; index++) {

            var newDate = new Date(projectInfoCov[pair].price_timeseries_30d[index].dt);
            // const options = { weekday: 'short' };
            const options = { day: 'numeric', month: 'short' };
            newDate = newDate.toLocaleDateString("en-EN", options);
            daysArray.push(newDate)
            liquiditySeries30d.push(projectInfoCov[pair].price_timeseries_30d[index].price_of_token0_in_quote_currency);
            if (projectInfoCov[pair].price_timeseries_30d[index].price_of_token0_in_quote_currency > maxVol) maxVol = projectInfoCov[pair].price_timeseries_30d[index].price_of_token0_in_quote_currency;
        }

        unitVol = Math.ceil(maxVol / projectInfoCov[pair].price_timeseries_30d.length);

        for (let index = 0; index < projectInfoCov[pair].price_timeseries_30d.length; index++) {
            volsArray.push(index * (unitVol));
        }

        new Chart(ctx7, {
            data: {
                labels: daysArray,
                datasets: [
                    {
                        type: "line",
                        label: "Price",
                        tension: 0.4,
                        borderWidth: 0,
                        pointRadius: 0,
                        pointBackgroundColor: "#EA4D00",
                        borderColor: "#EA4D00",
                        borderWidth: 3,
                        backgroundColor: gradientStroke1,
                        data: liquiditySeries30d,
                        fill: true,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            },
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 10,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

    }





}

export function enableTokenPrice30dChart(chart, prices) {

    const thisChart = Chart.getChart(chart);
    if (thisChart) {// Reseting the chart if called again
        thisChart.destroy();
    }
    var ctx7 = document.getElementById(chart).getContext("2d");

    var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    // Axies
    var daysArray = new Array();

    for (let index = (prices.length); index >= 1; index--) {
        var newDate = new Date();
        newDate.setDate(newDate.getDate() - index);
        // const options = { weekday: 'short' };
        const options = { day: 'numeric', month: 'short' };
        newDate = newDate.toLocaleDateString("en-EN", options);
        daysArray.push(newDate);
    }


    new Chart(ctx7, {
        data: {
            labels: daysArray,
            datasets: [
                {
                    type: "line",
                    label: "Price",
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                    pointBackgroundColor: "#EA4D00",
                    borderColor: "#EA4D00",
                    borderWidth: 3,
                    backgroundColor: gradientStroke1,
                    data: prices,
                    fill: true,
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, ticks) {
                            return '$' + value;
                        },
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 10,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });


}

export function enableTokenVolume30dChart(chart, volumes) {

    const thisChart = Chart.getChart(chart);
    if (thisChart) {// Reseting the chart if called again
        thisChart.destroy();
    }
    var ctx7 = document.getElementById(chart).getContext("2d");

    var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    // Axies
    var daysArray = new Array();

    for (let index = (volumes.length); index >= 1; index--) {
        var newDate = new Date();
        newDate.setDate(newDate.getDate() - index);
        // const options = { weekday: 'short' };
        const options = { day: 'numeric', month: 'short' };
        newDate = newDate.toLocaleDateString("en-EN", options);
        daysArray.push(newDate);
    }


    new Chart(ctx7, {
        data: {
            labels: daysArray,
            datasets: [{
                type: "bar",
                label: "Volume",
                weight: 5,
                tension: 0.4,
                borderWidth: 0,
                pointBackgroundColor: "#3A416F",
                borderColor: "#3A416F",
                backgroundColor: '#3A416F',
                borderRadius: 4,
                borderSkipped: false,
                data: volumes,
                maxBarThickness: 5,
            },
            {
                type: "line",
                label: "Referral",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                pointBackgroundColor: "#EA4D00",
                borderColor: "#EA4D00",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                data: volumes,
                fill: true,
            }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, ticks) {
                            return '$' + value;
                        },
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 10,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });







}

export function enableVolume30dChart(charts, projectInfoCov) {

    for (let pair = 0; pair < charts.length; pair++) {
        const thisChart = Chart.getChart(charts[pair]);
        if (thisChart) {// Reseting the chart if called again
            thisChart.destroy();
        }
        var ctx7 = document.getElementById(charts[pair]).getContext("2d");

        var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        // Axies
        var daysArray = new Array();
        var volsArray = new Array();
        var maxVol = 0;
        var unitVol = 0;

        // Data
        var volumeSeries30d = new Array();

        for (let index = 0; index < projectInfoCov[pair].volume_timeseries_30d.length; index++) {

            var newDate = new Date(projectInfoCov[pair].volume_timeseries_30d[index].dt);
            // const options = { weekday: 'short' };
            const options = { day: 'numeric', month: 'short' };
            newDate = newDate.toLocaleDateString("en-EN", options);
            daysArray.push(newDate)
            volumeSeries30d.push(projectInfoCov[pair].volume_timeseries_30d[index].volume_quote);
            if (projectInfoCov[pair].volume_timeseries_30d[index].volume_quote > maxVol) maxVol = projectInfoCov[pair].volume_timeseries_30d[index].volume_quote;
        }

        unitVol = Math.ceil(maxVol / projectInfoCov[pair].volume_timeseries_30d.length);

        for (let index = 0; index < projectInfoCov[pair].volume_timeseries_30d.length; index++) {
            volsArray.push(index * (unitVol));
        }

        new Chart(ctx7, {
            data: {
                labels: daysArray,
                datasets: [{
                    type: "bar",
                    label: "Volume",
                    weight: 5,
                    tension: 0.4,
                    borderWidth: 0,
                    pointBackgroundColor: "#3A416F",
                    borderColor: "#3A416F",
                    backgroundColor: '#3A416F',
                    borderRadius: 4,
                    borderSkipped: false,
                    data: volumeSeries30d,
                    maxBarThickness: 5,
                },
                {
                    type: "line",
                    label: "Referral",
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                    pointBackgroundColor: "#EA4D00",
                    borderColor: "#EA4D00",
                    borderWidth: 3,
                    backgroundColor: gradientStroke1,
                    data: volumeSeries30d,
                    fill: true,
                }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            },
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 10,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

    }





}

export function enableVolume30dChartMarkets(charts, projectInfoCov) {

    for (let pair = 0; pair < charts.length; pair++) {
        const thisChart = Chart.getChart(charts[pair]);
        if (thisChart) {// Reseting the chart if called again
            thisChart.destroy();
        }
        var ctx7 = document.getElementById(charts[pair]).getContext("2d");

        var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        // Axies
        var daysArray = new Array();
        var volsArray = new Array();
        var maxVol = 0;
        var unitVol = 0;

        // Data
        var volumeSeries30d = new Array();

        for (let index = 0; index < projectInfoCov[pair].volume_chart_30d.length; index++) {

            var newDate = new Date(projectInfoCov[pair].volume_chart_30d[index].dt);
            // const options = { weekday: 'short' };
            const options = { day: 'numeric', month: 'short' };
            newDate = newDate.toLocaleDateString("en-EN", options);
            daysArray.push(newDate)
            volumeSeries30d.push(projectInfoCov[pair].volume_chart_30d[index].volume_quote);
            if (projectInfoCov[pair].volume_chart_30d[index].volume_quote > maxVol) maxVol = projectInfoCov[pair].volume_chart_30d[index].volume_quote;
        }

        unitVol = Math.ceil(maxVol / projectInfoCov[pair].volume_chart_30d.length);

        for (let index = 0; index < projectInfoCov[pair].volume_chart_30d.length; index++) {
            volsArray.push(index * (unitVol));
        }

        new Chart(ctx7, {
            data: {
                labels: daysArray,
                datasets: [{
                    type: "bar",
                    label: "Volume",
                    weight: 5,
                    tension: 0.4,
                    borderWidth: 0,
                    pointBackgroundColor: "#3A416F",
                    borderColor: "#3A416F",
                    backgroundColor: '#3A416F',
                    borderRadius: 4,
                    borderSkipped: false,
                    data: volumeSeries30d,
                    maxBarThickness: 5,
                },
                {
                    type: "line",
                    label: "Referral",
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 0,
                    pointBackgroundColor: "#EA4D00",
                    borderColor: "#EA4D00",
                    borderWidth: 3,
                    backgroundColor: gradientStroke1,
                    data: volumeSeries30d,
                    fill: true,
                }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            },
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 10,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

    }

}


// OVERALL stats

export function enableOverallVolume30dChartMarkets(chart, dexes) {

    var ctx4 = document.getElementById(chart).getContext("2d");

    var dexesNames = new Array();
    var dexesVolumes = new Array();
    var chartColors = new Array();

    dexesNames = getDEXEsNames(dexes);

    dexesNames = dexesNames.filter(onlyUniqueArrayValues);

    var dexesVolumes = new Array(dexesNames.length).fill(0);

    for (let index = 0; index < dexesNames.length; index++) {
        for (let index2 = 0; index2 < dexes.length; index2++) {

            if (dexes[index2].dex_name == dexesNames[index]) {
                for (let index3 = 0; index3 < dexes[index2].volume_chart_30d.length; index3++) {
                    dexesVolumes[index] += Math.trunc(dexes[index2].volume_chart_30d[index3].volume_quote);
                    chartColors.push(dynamicColors());
                }
            }
        }

    }

    //Convert DEXEs names to titles
    dexesNames = convertLabelsToTile(dexesNames);

    new Chart(ctx4, {
        type: "pie",
        data: {
            labels: dexesNames,
            datasets: [{
                label: "Exchanges",
                weight: 9,
                cutout: 0,
                tension: 0.9,
                pointRadius: 2,
                borderWidth: 2,
                backgroundColor: chartColors,
                data: dexesVolumes,
                fill: false
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    }
                },
            },
        },
    });

}

export function enableOverallVolume30dChangeChartMarkets(chart, dexes) {


    var ctx4 = document.getElementById(chart).getContext("2d");

    var dexesNames = new Array();
    var dexesVolumes = new Array();

    dexesNames = getDEXEsNames(dexes);

    dexesNames = dexesNames.filter(onlyUniqueArrayValues);

    dexesVolumes = auxVolume30dChange(dexesNames, dexes);

    //Convert DEXEs names to titles
    dexesNames = convertLabelsToTile(dexesNames);

    // Axies
    var daysArray = new Array();

    for (let index = 0; index < dexes[0].volume_chart_30d.length; index++) {

        var newDate = new Date(dexes[0].volume_chart_30d[index].dt);
        const options = { day: 'numeric', month: 'short' };
        newDate = newDate.toLocaleDateString("en-EN", options);
        daysArray.push(newDate)
    }

    var gradientStroke1 = ctx4.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors


    var datasetsArray = new Array();

    for (let index = 0; index < dexesVolumes.length; index++) {
        datasetsArray.push({
            label: dexesNames[index],
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#EA4D00",
            borderWidth: 3,
            backgroundColor: gradientStroke1,
            fill: true,
            data: dexesVolumes[index],
            maxBarThickness: 6
        });
    }


    new Chart(ctx4, {
        type: "line",
        data: {
            labels: daysArray,
            datasets: datasetsArray,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 20,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });

}

export function auxVolume30dChange(uniqueDexesNames, dexes) {

    var resultArray = new Array();

    for (let index = 0; index < uniqueDexesNames.length; index++) {
        //console.log("New dex!")
        var auxArray = new Array();
        for (let index2 = 0; index2 < dexes.length; index2++) {
            if (uniqueDexesNames[index] == dexes[index2].dex_name) {
                if (auxArray.length == 0) {
                    for (let index4 = 0; index4 < dexes[index2].volume_chart_30d.length; index4++) {
                        auxArray.push(dexes[index2].volume_chart_30d[index4].volume_quote);
                    }
                } else {
                    for (let index4 = 0; index4 < dexes[index2].volume_chart_30d.length; index4++) {
                        auxArray[index4] += dexes[index2].volume_chart_30d[index4].volume_quote;
                    }
                }

            }
            if (index2 == (dexes.length - 1)) resultArray.push(auxArray);
        }
    }

    return resultArray;

}

export function enableOverallSwapsChartMarkets(chart, dexes) {

    var ctx5 = document.getElementById(chart).getContext("2d");

    var dexesNames = new Array();

    dexesNames = getDEXEsNames(dexes);

    dexesNames = dexesNames.filter(onlyUniqueArrayValues);

    var dexesSwaps = new Array(dexesNames.length).fill(0);

    for (let index = 0; index < dexesNames.length; index++) {
        for (let index2 = 0; index2 < dexes.length; index2++) {
            if (dexes[index2].dex_name == dexesNames[index]) {
                dexesSwaps[index] += dexes[index2].total_swaps_24h;
            }
        }

    }

    dexesNames = convertLabelsToTile(dexesNames);

    new Chart(ctx5, {
        type: "bar",
        data: {
            labels: dexesNames,
            datasets: [{
                label: "Nmber of Swaps",
                weight: 5,
                borderWidth: 0,
                borderRadius: 4,
                backgroundColor: '#EA4D00',
                data: dexesSwaps,
                fill: false,
                maxBarThickness: 35
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#9ca2b7'
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: true,
                        drawTicks: true,
                    },
                    ticks: {
                        display: true,
                        color: '#9ca2b7',
                        padding: 10
                    }
                },
            },
        },
    });





}

export function enableOverallPairs7dChartMarkets(chart, dexes) {

    var ctx5 = document.getElementById(chart).getContext("2d");

    var dexesNamesPairs = new Array();
    var dexesNames = new Array();

    dexesNames = getDEXEsNames(dexes);

    dexesNames = dexesNames.filter(onlyUniqueArrayValues);

    var dexesPairs = new Array(dexesNames.length).fill(0);

    for (let index = 0; index < dexesNames.length; index++) {
        for (let index2 = 0; index2 < dexes.length; index2++) {
            if (dexes[index2].dex_name == dexesNames[index]) {
                dexesPairs[index] += dexes[index2].total_active_pairs_7d;
            }
        }
    }

    dexesNames = convertLabelsToTile(dexesNames);

    new Chart(ctx5, {
        type: "bar",
        data: {
            labels: dexesNames,
            datasets: [{
                label: "Active Pairs",
                weight: 5,
                borderWidth: 0,
                borderRadius: 4,
                backgroundColor: '#EA4D00',
                data: dexesPairs,
                fill: false,
                maxBarThickness: 35
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#9ca2b7'
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: true,
                        drawTicks: true,
                    },
                    ticks: {
                        display: true,
                        color: '#9ca2b7',
                        padding: 10
                    }
                },
            },
        },
    });

}

export function enableLiquidity30dChart(charts, projectInfoCov) {

    for (let pair = 0; pair < charts.length; pair++) {
        const thisChart = Chart.getChart(charts[pair]);
        if (thisChart) {// Reseting the chart if called again
            thisChart.destroy();
        }
        var ctx7 = document.getElementById(charts[pair]).getContext("2d");

        var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        // Axies
        var daysArray = new Array();
        var volsArray = new Array();
        var maxVol = 0;
        var unitVol = 0;

        // Data
        var liquiditySeries30d = new Array();

        for (let index = 0; index < projectInfoCov[pair].liquidity_timeseries_30d.length; index++) {

            var newDate = new Date(projectInfoCov[pair].liquidity_timeseries_30d[index].dt);
            // const options = { weekday: 'short' };
            const options = { day: 'numeric', month: 'short' };
            newDate = newDate.toLocaleDateString("en-EN", options);
            daysArray.push(newDate)
            liquiditySeries30d.push(projectInfoCov[pair].liquidity_timeseries_30d[index].liquidity_quote);
            if (projectInfoCov[pair].liquidity_timeseries_30d[index].liquidity_quote > maxVol) maxVol = projectInfoCov[pair].liquidity_timeseries_30d[index].liquidity_quote;
        }

        unitVol = Math.ceil(maxVol / projectInfoCov[pair].liquidity_timeseries_30d.length);

        for (let index = 0; index < projectInfoCov[pair].liquidity_timeseries_30d.length; index++) {
            volsArray.push(index * (unitVol));
        }

        new Chart(ctx7, {
            data: {
                labels: daysArray,
                datasets: [
                    {
                        type: "line",
                        label: "Liquidity",
                        tension: 0.4,
                        borderWidth: 0,
                        pointRadius: 0,
                        pointBackgroundColor: "#EA4D00",
                        borderColor: "#EA4D00",
                        borderWidth: 3,
                        backgroundColor: gradientStroke1,
                        data: liquiditySeries30d,
                        fill: true,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            },
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 10,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

    }





}

export function enableLiquidity30dChartMarkets(charts, projectInfoCov) {

    for (let pair = 0; pair < charts.length; pair++) {
        const thisChart = Chart.getChart(charts[pair]);
        if (thisChart) {// Reseting the chart if called again
            thisChart.destroy();
        }
        var ctx7 = document.getElementById(charts[pair]).getContext("2d");

        var gradientStroke1 = ctx7.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        // Axies
        var daysArray = new Array();
        var volsArray = new Array();
        var maxVol = 0;
        var unitVol = 0;

        // Data
        var liquiditySeries30d = new Array();

        for (let index = 0; index < projectInfoCov[pair].liquidity_chart_30d.length; index++) {

            var newDate = new Date(projectInfoCov[pair].liquidity_chart_30d[index].dt);
            // const options = { weekday: 'short' };
            const options = { day: 'numeric', month: 'short' };
            newDate = newDate.toLocaleDateString("en-EN", options);
            daysArray.push(newDate)
            liquiditySeries30d.push(projectInfoCov[pair].liquidity_chart_30d[index].liquidity_quote);
            if (projectInfoCov[pair].liquidity_chart_30d[index].liquidity_quote > maxVol) maxVol = projectInfoCov[pair].liquidity_chart_30d[index].liquidity_quote;
        }

        unitVol = Math.ceil(maxVol / projectInfoCov[pair].liquidity_chart_30d.length);

        for (let index = 0; index < projectInfoCov[pair].liquidity_chart_30d.length; index++) {
            volsArray.push(index * (unitVol));
        }

        new Chart(ctx7, {
            data: {
                labels: daysArray,
                datasets: [
                    {
                        type: "line",
                        label: "Liquidity",
                        tension: 0.4,
                        borderWidth: 0,
                        pointRadius: 0,
                        pointBackgroundColor: "#EA4D00",
                        borderColor: "#EA4D00",
                        borderWidth: 3,
                        backgroundColor: gradientStroke1,
                        data: liquiditySeries30d,
                        fill: true,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            },
                            display: true,
                            padding: 10,
                            color: '#b2b9bf',
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#b2b9bf',
                            padding: 10,
                            font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

    }





}

export function enableTokenomicsHoldersDistributionChart(chart, tokenHolders, max_supply) {

    const thisChart = Chart.getChart(chart);
    if (thisChart) {// Reseting the chart if called again
        thisChart.destroy();
    }
    var ctx4 = document.getElementById(chart).getContext("2d");

    // Data
    var holdersBalance = new Array();
    var holdersAddresses = new Array();
    var chartColors = new Array();

    for (let index = 0; index < tokenHolders.length; index++) {
        holdersBalance.push(parseFloat(((parseFloat(ethers.utils.formatUnits((tokenHolders[index].balance), (tokenHolders[index].contract_decimals)) / max_supply) * 100).toFixed(2))));
        holdersAddresses.push(tokenHolders[index].address);
        chartColors.push(dynamicColors())
    }

    new Chart(ctx4, {
        type: "pie",
        data: {
            labels: holdersAddresses,
            datasets: [{
                label: "Holders",
                weight: 9,
                cutout: 0,
                tension: 0.9,
                pointRadius: 2,
                borderWidth: 2,
                backgroundColor: chartColors,
                data: holdersBalance,
                fill: false
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    }
                },
            },
        },
    });

    // document.getElementById(chart).classList.remove("d-none")

}

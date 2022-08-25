import React, { useState, useEffect } from 'react'
import useAppContext from '../../Context'
import { addCommasToNumber } from '../../../services/myjs'
import { enableTokenPrice30dChart, enableTokenVolume30dChart } from '../../../services/myChartjs'
import { updatePoolStatsChart } from '../../../services/myjs'
import $ from 'jquery'

function MarketData() {

    const { projectInfoCG } = useAppContext()

    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()

    const [minVolume, setMinVolume] = useState()
    const [maxVolume, setMaxVolume] = useState()
    const [totalVolume, setTotalVolume] = useState()

    useEffect(() => {
        if (!projectInfoCG.historicalMarket.prices || !projectInfoCG.historicalMarket.prices.length || !projectInfoCG.historicalMarket.volumes.length) return;

        var minPriceAux, maxPriceAux, minVolumeAux, maxVolumeAux, totalVolumeAux;

        for (let index = 0; index < projectInfoCG.historicalMarket.prices.length; index++) {
            if (index == 0) {//Initialise
                //Price
                minPriceAux = maxPriceAux = projectInfoCG.historicalMarket.prices[index]
                minVolumeAux = maxVolumeAux = totalVolumeAux = projectInfoCG.historicalMarket.prices[index]
            } else {// Update values
                //Price
                if (minPriceAux > projectInfoCG.historicalMarket.prices[index]) minPriceAux = projectInfoCG.historicalMarket.prices[index]
                if (maxPriceAux < projectInfoCG.historicalMarket.prices[index]) maxPriceAux = projectInfoCG.historicalMarket.prices[index]
                //Volume    
                if (minVolumeAux > projectInfoCG.historicalMarket.volumes[index]) minVolumeAux = projectInfoCG.historicalMarket.volumes[index]
                if (maxVolumeAux < projectInfoCG.historicalMarket.volumes[index]) maxVolumeAux = projectInfoCG.historicalMarket.volumes[index]
                totalVolumeAux += projectInfoCG.historicalMarket.volumes[index]
            }
        }

        setMinPrice(minPriceAux)
        setMaxPrice(maxPriceAux)
        setMinVolume(minVolumeAux)
        setMaxVolume(maxVolumeAux)
        setTotalVolume(totalVolumeAux)


    }, [projectInfoCG.historicalMarket])

    useEffect(() => {
        if (!projectInfoCG.historicalMarket || projectInfoCG.historicalMarket == undefined || !projectInfoCG.historicalMarket.prices) return;
        var chartsPriceID = $('#market-data-price')

        if (!chartsPriceID || chartsPriceID.length == 0) return;

        enableTokenPrice30dChart(chartsPriceID.attr("id"), projectInfoCG.historicalMarket.prices)
    }, [projectInfoCG.historicalMarket])

    useEffect(() => {
        if (!projectInfoCG.historicalMarket || projectInfoCG.historicalMarket == undefined || !projectInfoCG.historicalMarket.volumes) return;
        var chartsPriceID = $('#market-data-volume')

        if (!chartsPriceID || chartsPriceID.length == 0) return;

        enableTokenVolume30dChart(chartsPriceID.attr("id"), projectInfoCG.historicalMarket.volumes)
    }, [projectInfoCG.historicalMarket])


    return (
        <div id='market-data' className="row">
            <div className="analysis-div-content">
                {projectInfoCG.historicalMarket &&
                    <div id="market-data-price-volume-div" className="col-12"  style={{zIndex: 0}}>
                        <div className='action-buttons-div d-flex flex-row justify-content-start z-index-2'>
                            <button type="button" className="btn btn-orange btn-chart active price m-0" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} onClick={() => updatePoolStatsChart("market-data-price-volume-div", "price")}>Price</button>
                            <button type="button" className="btn btn-default btn-chart inactive volume ms-4 my-0" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} onClick={() => updatePoolStatsChart("market-data-price-volume-div", "volume")}>Volume</button>
                        </div>
                        <div className="card z-index-2" style={{ borderTopLeftRadius: 0 }}>
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2"><span className='type-title'>Price</span> History From Last 30 Days</h6>
                                </div>
                            </div>
                            <div className="card-body row p-3">
                                <div className='col-lg-2 col-12'>
                                    <div className="d-flex flex-lg-column flex-sm-row justify-content-lg-start justify-content-sm-around">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Min/Max Price</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>${minPrice && addCommasToNumber(minPrice < 1 ? minPrice.toFixed(3) : minPrice.toFixed(2))} / ${maxPrice && addCommasToNumber(maxPrice < 1 ? maxPrice.toFixed(3) : maxPrice.toFixed(2))}</span>
                                            </h5>
                                        </div>

                                        <div className="numbers mt-lg-2 mt-0">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Price %7d</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`${(projectInfoCG.info.market_data.price_change_percentage_7d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>{projectInfoCG.info.market_data.price_change_percentage_7d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                                            </h5>
                                        </div>

                                        <div className="numbers mt-lg-2 mt-0">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Price %30d</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`${(projectInfoCG.info.market_data.price_change_percentage_30d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>{projectInfoCG.info.market_data.price_change_percentage_30d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_30d.toFixed(2)}%</span>
                                            </h5>
                                        </div>

                                        <div className="numbers mt-lg-2 mt-0">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Volume</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>${totalVolume && addCommasToNumber(totalVolume.toFixed(0))}</span>
                                            </h5>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-10 col-12 chart">
                                    <canvas id={`market-data-price`} className="chart-canvas price" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                    <canvas id={`market-data-volume`} className="chart-canvas volume d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                </div>
                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>
    )
}

export default MarketData
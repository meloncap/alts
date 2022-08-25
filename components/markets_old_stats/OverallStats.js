// Not used due to Covalent API endpoint issues

import React, { useState, useEffect } from 'react'
import { enableOverallVolume30dChartMarkets, enableOverallSwapsChartMarkets, enableOverallPairs7dChartMarkets, enableOverallVolume30dChangeChartMarkets } from '../../services/myChartjs'

function OverallStats({ DEXESData }) {

    const [isOverallVolumeChartEnabled, setIsOverallVolumeChartEnabled] = useState(false)
    const [isOverallVolumeChangeChartEnabled, setIsOverallVolumeChangeChartEnabled] = useState(false)
    const [isOverallSwapsChartEnabled, setIsOverallSwapsChartEnabled] = useState(false)
    const [isOverallPairsChartEnabled, setIsOverallPairsChartEnabled] = useState(false)

    useEffect(() => {

        if (isOverallVolumeChartEnabled || !DEXESData) return;
        var chartVolID = "overall-30d-volume";

        enableOverallVolume30dChartMarkets(chartVolID, DEXESData);
        setIsOverallVolumeChartEnabled(true);
    })

    useEffect(() => {

        if (isOverallVolumeChangeChartEnabled || !DEXESData) return;
        var chartVolID = "overall-30d-volume-change";

        enableOverallVolume30dChangeChartMarkets(chartVolID, DEXESData);
        setIsOverallVolumeChangeChartEnabled(true);
    })

    useEffect(() => {

        if (isOverallSwapsChartEnabled || !DEXESData) return;
        var chartSwapID = "overall-24h-swaps";

        enableOverallSwapsChartMarkets(chartSwapID, DEXESData);
        setIsOverallSwapsChartEnabled(true);
    })

    useEffect(() => {

        if (isOverallPairsChartEnabled || !DEXESData) return;
        var chartSwapID = "overall-7d-activepairs";

        enableOverallPairs7dChartMarkets(chartSwapID, DEXESData);
        setIsOverallPairsChartEnabled(true);
    })


    return (
        <div className="analysis-div-content">
            <div className="row mx-auto">
                <div className="col-lg-12 mt-4 mb-2 d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column h-100 ">
                        <h5 className="font-weight-bolder mb-0">Overall Stats</h5>
                    </div>
                    {/* <div>
                        <Link href={`https://pancakeswap.finance/info/pool/${pair.exchange}`}>
                            <a title={`https://pancakeswap.finance/info/pool/${pair.exchange}`} className='font-weight-bolder mb-0 small' target="_blank">View on Pancakeswap <BiLinkExternal /></a>
                        </Link>
                    </div> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-12 mb-4">
                    <div className="card z-index-2">
                        <div className="card-header p-3 pb-0">
                            <h6>Volume 30d</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="chart">
                                <canvas id="overall-30d-volume" className="chart-canvas" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '450.5px' }} width={450} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                    <div className="card z-index-2">
                        <div className="card-header p-3 pb-0">
                            <h6>Volume 30d Change</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="chart">
                                <canvas id="overall-30d-volume-change" className="chart-canvas" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '450.5px' }} width={450} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                    <div className="card z-index-2">
                        <div className="card-header p-3 pb-0">
                            <h6>Swaps 24h</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="chart">
                                <canvas id="overall-24h-swaps" className="chart-canvas" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '450.5px' }} width={450} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                    <div className="card z-index-2">
                        <div className="card-header p-3 pb-0">
                            <h6>Active Pairs 7d</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="chart">
                                <canvas id="overall-7d-activepairs" className="chart-canvas" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '450.5px' }} width={450} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverallStats
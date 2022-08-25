import React, { useState, useEffect } from 'react'
import { toTitleCase } from '../../services/myjs'
import $ from 'jquery'
import { enableVolume30dChartMarkets, enableLiquidity30dChartMarkets } from '../../services/myChartjs'
import PoolStatsCard from '../cards/PoolStatsCard'
import OverallStats from './OverallStats'
import supportedDEXesCovalent from '../../public/supportedDEXesCovalent.json'

function PoolsStats() {

    const [DEXESData, setDEXESData] = useState()
    const [supportedDEXEs, setSupportedDEXEs] = useState(supportedDEXesCovalent)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [isVolumeChartEnabled, setIsVolumeChartEnabled] = useState(false)
    const [isLiquidityChartEnabled, setIsLiquidityChartEnabled] = useState(false)

    useEffect(() => {
        (async () => {
            if (isDataLoaded || !supportedDEXEs) return;

            const allDEXesResponse = await fetch('/api/covalent/dexes/charts');

            if (!allDEXesResponse.ok) {
                //Show an error
                console.log(allDEXesResponse);
                return;
            }

            const allDEXesResult = await allDEXesResponse.json();
            setDEXESData(allDEXesResult);
            setIsDataLoaded(true);

        })()
    }, [])


    useEffect(() => {
        if (isVolumeChartEnabled || !supportedDEXEs) return;
        var chartsVolID = $('.volume-30-chart').map(function () {
            return $(this).attr('id');
        });

        if ((isVolumeChartEnabled) || !chartsVolID || chartsVolID.length == 0) return;
        enableVolume30dChartMarkets(chartsVolID, DEXESData);
        setIsVolumeChartEnabled(true);
    })

    useEffect(() => {

        if (isLiquidityChartEnabled || !supportedDEXEs) return;
        var chartsLiqID = $('.liquidity-30-chart').map(function () {
            return $(this).attr('id');
        });

        if ((isLiquidityChartEnabled) || !chartsLiqID || chartsLiqID.length == 0) return;
        enableLiquidity30dChartMarkets(chartsLiqID, DEXESData);
        setIsLiquidityChartEnabled(true);
    })


    return (
        <div id='ecosystem-pools-stats' className="row mx-auto mt-4">
            <div className="col-12">
                <div className="row">
                    <div className="card card-plain mb-4">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-auto">
                                    <div className="h-100 d-flex flex-row analysis-title-div expanded">
                                        <h2 className="font-weight-bolder mb-0 expanded">DEXes Stats </h2>
                                        {!DEXESData &&
                                            <div className='ms-3 pt-2' style={{ width: "auto", height: "auto", color: "#EA4D00" }}>
                                                <div className="spinner-border" role="status" >
                                                    <span className="sr-only"></span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <OverallStats DEXESData={DEXESData} />

                {supportedDEXEs && DEXESData && DEXESData.length > 0 &&
                    <>

                        {DEXESData.map((dex, idx) =>
                        (
                            <PoolStatsCard key={idx} dex={dex} style={{ marginTop: 4 }}
                                chain_name={toTitleCase(dex.chain_name.replace("mainnet", "").replace("bsc", "BNB chain").replace("eth", "ethereum"))}
                            />

                        ))}
                    </>
                }
            </div>
        </div >
    )
}

export default PoolsStats
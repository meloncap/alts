import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useAppContext from '../../Context'
import { BiLinkExternal } from "react-icons/bi";
import { MdInsertChart } from "react-icons/md";
import { addCommasToNumber, toTitleCase } from '../../../services/myjs'
import { enableVolume30dChart, enableLiquidity30dChart, enablePrice30dChart } from '../../../services/myChartjs'
import $ from 'jquery'
import { updatePoolStatsChart } from '../../../services/myjs'
import { AiFillCaretDown } from "react-icons/ai";
import { visualizeAnalysisSection } from '../../../services/myjs'
import { AiFillFilter } from "react-icons/ai";
import { GrAscend, GrDescend } from "react-icons/gr";
import { getDEXExplorerUrl, getDEXExplorerName } from '../../../services/myjs'

function PoolsStats() {

    const { projectInfoCov } = useAppContext()

    const [myOrderPools, setMyOrderPools] = useState()
    const [selectOrderPools, setSelectOrderPools] = useState("desc-liquidity")

    useEffect(() => {
        if (!projectInfoCov.pools || projectInfoCov.pools == undefined) return
        var newOrderPools = Object.assign([], projectInfoCov.pools)
        newOrderPools.sort(function (a, b) { return b.total_liquidity_quote - a.total_liquidity_quote })
        setMyOrderPools(newOrderPools)

    }, [projectInfoCov.pools])

    useEffect(() => {
        if (!myOrderPools || myOrderPools == undefined) return
        var chartsPriceID = $('.price-30-chart').map(function () {
            return $(this).attr('id')
        })
        if (!chartsPriceID || chartsPriceID.length == 0) return

        enablePrice30dChart(chartsPriceID, myOrderPools)
    }, [myOrderPools])

    useEffect(() => {

        if (!myOrderPools || myOrderPools == undefined) return
        var chartsVolID = $('.volume-30-chart').map(function () {
            return $(this).attr('id')
        })
        if (!chartsVolID || chartsVolID.length == 0) return

        enableVolume30dChart(chartsVolID, myOrderPools)
    }, [myOrderPools])

    useEffect(() => {
        if (!myOrderPools || myOrderPools == undefined) return
        var chartsLiqID = $('.liquidity-30-chart').map(function () {
            return $(this).attr('id')
        })
        if (!chartsLiqID || chartsLiqID.length == 0) return

        enableLiquidity30dChart(chartsLiqID, myOrderPools)
    }, [myOrderPools])


    function updateSelectOrderPools(event) {
        if (event.target.value == -1) {
            setSelectOrderPools(event.target.value)
            return
        }
        if (event.target.value == "desc-liquidity") {
            myOrderPools.sort(function (a, b) { return b.total_liquidity_quote - a.total_liquidity_quote })
            setSelectOrderPools(event.target.value)
            setMyOrderPools(myOrderPools)
        } else if (event.target.value == "asc-liquidity") {
            myOrderPools.sort(function (a, b) { return a.total_liquidity_quote - b.total_liquidity_quote })
            setSelectOrderPools(event.target.value)
            setMyOrderPools(myOrderPools)
        } else if (event.target.value == "desc-volume") {
            myOrderPools.sort(function (a, b) { return b.volume_7d_quote - a.volume_7d_quote })
            setSelectOrderPools(event.target.value)
            setMyOrderPools(myOrderPools)
        } else if (event.target.value == "asc-volume") {
            myOrderPools.sort(function (a, b) { return a.volume_7d_quote - b.volume_7d_quote })
            setSelectOrderPools(event.target.value)
            setMyOrderPools(myOrderPools)
        }
    }

    return projectInfoCov.pools && projectInfoCov.pools.length > 0 ? (
        <div id='pool-stats' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded" >
                                    <h2 className="font-weight-bolder mb-0 expanded" onClick={() => visualizeAnalysisSection("pool-stats")} style={{ cursor: "pointer" }}><MdInsertChart color='33374d' /> Pools Stats <AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {myOrderPools && myOrderPools.length > 1 &&
                <div className='row'>
                    <div className='col-12'>
                        <div className="input-group" style={{ width: "fit-content" }}>
                            <span className="input-group-text text-body">{selectOrderPools.includes("asc") || selectOrderPools.includes("desc") ? selectOrderPools.includes("asc") ? <GrAscend /> : <GrDescend /> : <AiFillFilter />}</span>
                            <select id='filter-network' className="form-control ps-0" value={selectOrderPools} onChange={updateSelectOrderPools}>
                                <option value={-1}>Order By</option>
                                <option value="desc-liquidity">DESC - Liquidity</option>
                                <option value="asc-liquidity">ASC - Liquidity</option>
                                <option value="desc-volume">DESC - Volume 7d</option>
                                <option value="asc-volume">ASC - Volume 7d</option>
                            </select>
                        </div>
                    </div>
                </div>
            }
            {myOrderPools && myOrderPools.length > 0 ?
                myOrderPools.map((pair, idx) =>
                (
                    <div key={idx} className="analysis-div-content">
                        <div className="row ">
                            <div className="col-lg-12 mt-4 d-flex flex-row justify-content-between">
                                <div className="d-flex flex-column h-100 ">
                                    <h5 className="font-weight-bolder mb-0">{`${pair.token_0.contract_ticker_symbol} / ${pair.token_1.contract_ticker_symbol} - ${toTitleCase(pair.dex_name)}`}</h5>
                                    {/* <h5 className="font-weight-bolder mb-0"><span className='address-text '>{pair.exchange}</span></h5> */}
                                </div>
                                <div>
                                    <Link href={`${getDEXExplorerUrl(pair.chain_id, pair.dex_name, pair.exchange)}`}>
                                        <a title={`${getDEXExplorerUrl(pair.chain_id, pair.dex_name, pair.exchange)}`} className='font-weight-bolder mb-0 small' target="_blank">View on {toTitleCase(getDEXExplorerName(pair.chain_id, pair.dex_name))} <BiLinkExternal /></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-12 d-flex flex-row justify-content-between">
                                <h5 className="font-weight-bolder mb-0"><span className='address-text '>{pair.exchange}</span></h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2 col-md-4 col-12 mb-4">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-12 d-flex flex-row justify-content-between">
                                                <div style={{ width: "fit-content" }}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Liquidity</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            <span className={`text-sm font-weight-bolder`}>{pair.total_liquidity_quote ? "$" + addCommasToNumber(pair.total_liquidity_quote.toFixed(0)) : "-"}</span>
                                                        </h5>
                                                    </div>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Swaps 24h</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            <span className={`text-sm font-weight-bolder`}>{pair.swap_count_24h ? pair.swap_count_24h : "-"}</span>
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Volume 24h</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            <span className={`text-sm font-weight-bolder`}>{pair.volume_24h_quote ? "$" + addCommasToNumber(pair.volume_24h_quote.toFixed(0)) : "-"}</span>
                                                        </h5>
                                                    </div>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Volume 7d</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            <span className={`text-sm font-weight-bolder`}>{pair.volume_7d_quote ? "$" + addCommasToNumber(pair.volume_7d_quote.toFixed(0)) : "-"}</span>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <div className="card-header pb-0 p-3">
                                        <div className="d-flex justify-content-between">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Tokens</p>
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Quantity</p>
                                        </div>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="numbers d-flex flex-row justify-content-between">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">{pair.token_0.contract_ticker_symbol}</p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        <span className={`text-sm font-weight-bolder`}>{addCommasToNumber((pair.token_0.reserve / 1e18).toFixed(2))}</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="numbers d-flex flex-row justify-content-between">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">{pair.token_1.contract_ticker_symbol}</p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        <span className={`text-sm font-weight-bolder`}>{addCommasToNumber((pair.token_1.reserve / 1e18).toFixed(2))}</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id={`pool-stats-div-${idx}`} className="col-lg-10 col-md-8 col-12">
                                <div className="action-buttons-div pool-price-volume-liquidity-charts pb-0 d-flex flex-row justify-content-start" >
                                    <button type="button" className="btn btn-orange btn-chart price active my-0" value={idx} onClick={() => updatePoolStatsChart(`pool-stats-div-${idx}`, "price")}>Price</button>
                                    <button type="button" className="btn btn-default btn-chart volume inactive ms-4 my-0" value={idx} onClick={() => updatePoolStatsChart(`pool-stats-div-${idx}`, "volume")}>Volume</button>
                                    <button type="button" className="btn btn-default btn-chart liquidity inactive ms-4 my-0" value={idx} onClick={() => updatePoolStatsChart(`pool-stats-div-${idx}`, "liquidity")}>Liquidity</button>
                                </div>
                                <div className="card z-index-2 " style={{ borderTopLeftRadius: 0 }}>
                                    <div className="card-body p-3">
                                        <div className="card-header pb-0 p-3">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-2"><span className='type-title'>Price</span> History From Last 30 Days</h6>
                                            </div>
                                        </div>
                                        <div className="chart">
                                            <canvas id={`price30d-${idx}`} className="chart-canvas pools-stats-chart price price-30-chart" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                            <canvas id={`volume30d-${idx}`} className="chart-canvas pools-stats-chart volume volume-30-chart d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                            <canvas id={`liquidity30d-${idx}`} className="chart-canvas pools-stats-chart liquidity liquidity-30-chart d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))

                : ""}
        </div >

    ) :
        <div id='pool-stats' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><MdInsertChart color='33374d' style={{ width: 40, height: 40 }} /> Pools Stats</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
}

export default PoolsStats
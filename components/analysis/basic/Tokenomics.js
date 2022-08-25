import React, { useState, useEffect } from 'react'
import { addCommasToNumber } from '../../../services/myjs'
import useAppContext from '../../Context'
import { AiFillCaretDown, AiOutlineAreaChart } from "react-icons/ai"
import { MdPieChart } from "react-icons/md"
import {
    visualizeAnalysisSection, getChainAnalyticsExplorerUrl, getChainAddressExplorerUrl,
    updateTokenomicsSubSections, getExplorerTransaction, getExplorerAddress, shortAddress, convertToFullDateMarketData
} from '../../../services/myjs'
import { ethers } from 'ethers'
import Link from 'next/link'
import { ImListNumbered } from "react-icons/im"
import { enableTokenomicsHoldersDistributionChart } from '../../../services/myChartjs'
import $ from 'jquery'

function Tokenomics() {

    const { projectInfoCG, projectInfoCov, userProject } = useAppContext()

    const [selectedNumberOfRecords, setSelectedNumberOfRecords] = useState(5)
    const [myTokenHolders, setMyTokenHolders] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if (!projectInfoCov.tokenHolders) return
        if (projectInfoCov.tokenHolders == -1) {
            $('#tokenomics-holders-distribution-total-supply').parent().parent().parent().parent().addClass('d-none')
            $('#tokenomics-holders-distribution-circulating-supply').parent().parent().parent().parent().addClass('d-none')
            return
        }
        setIsLoading(true)
        // console.log(projectInfoCov)
        var tokenHolders_ = Object.assign([], projectInfoCov.tokenHolders)
        setMyTokenHolders(tokenHolders_.slice(0, selectedNumberOfRecords))
    }, [projectInfoCov])

    const [myHolderTransactions, setMyTokenTransactions] = useState()

    useEffect(() => {

        if (!projectInfoCov.tokenTransactions || projectInfoCov.tokenTransactions.length == 0) return
        // console.log(projectInfoCov)
        var myHolderTransactions_ = Object.assign([], projectInfoCov.tokenTransactions)
        setMyTokenTransactions(myHolderTransactions_.slice(0, selectedNumberOfRecords))
    }, [projectInfoCov])

    useEffect(() => {
        if (!myTokenHolders || !projectInfoCG.info) return
        enableTokenomicsHoldersDistributionChart("tokenomics-holders-distribution-total-supply", myTokenHolders, projectInfoCG.info.market_data.total_supply)
        $('#tokenomics-holders-distribution-total-supply').removeClass('d-none')
    }, [myTokenHolders])

    useEffect(() => {
        if (!myTokenHolders || !projectInfoCG.info) return
        enableTokenomicsHoldersDistributionChart("tokenomics-holders-distribution-circulating-supply", myTokenHolders, projectInfoCG.info.market_data.circulating_supply)
        $('#tokenomics-holders-distribution-circulating-supply').removeClass('d-none')
        setIsLoading(false)
    }, [myTokenHolders])

    function updateSelectNumberOfRecords(event) {
        if (event.target.value == 5 || event.target.value == 10 || event.target.value == 15 || event.target.value == 20) {
            setSelectedNumberOfRecords(event.target.value)
            setMyTokenHolders(projectInfoCov.tokenHolders.slice(0, event.target.value))
            setMyTokenTransactions(projectInfoCov.tokenTransactions.slice(0, event.target.value))
        }
    }

    return projectInfoCG.info ? (
        <div id='tokenomics' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded" onClick={() => visualizeAnalysisSection("tokenomics")} style={{ cursor: "pointer" }}>
                                    <h2 className="font-weight-bolder mb-0 expanded"><MdPieChart color='33374d' /> Tokenomics <AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 analysis-div-content">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="card z-index-2">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2">Top {selectedNumberOfRecords} Holders % Distribution vs Total Supply</h6>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <canvas id={`tokenomics-holders-distribution-total-supply`} className="chart-canvas d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-12 mt-md-0 mt-3">
                        <div className="card z-index-2">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2">Top {selectedNumberOfRecords} Holders % Distribution vs Circulating Supply</h6>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <canvas id={`tokenomics-holders-distribution-circulating-supply`} className="chart-canvas d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <div className="card ">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2">Supply</h6>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-items-center ">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="text-center">
                                                    <p className="text-xs font-weight-bold mb-0">Max. Supply</p>
                                                    <h6 className="text-sm mb-0">{projectInfoCG.info.market_data.max_supply && projectInfoCG.info.market_data.max_supply > 0 ?
                                                        addCommasToNumber(projectInfoCG.info.market_data.max_supply.toFixed(2))
                                                        : "-"}</h6>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <p className="text-xs font-weight-bold mb-0">Total Supply</p>
                                                    <h6 className="text-sm mb-0">{projectInfoCG.info.market_data.total_supply && projectInfoCG.info.market_data.total_supply > 0 ?
                                                        addCommasToNumber(projectInfoCG.info.market_data.total_supply.toFixed(2))
                                                        : "-"}</h6>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <p className="text-xs font-weight-bold mb-0">Total Burned</p>
                                                    <h6 className="text-sm mb-0">{(projectInfoCG.info.market_data.max_supply && projectInfoCG.info.market_data.total_supply) && projectInfoCG.info.market_data.max_supply != projectInfoCG.info.market_data.total_supply ?
                                                        addCommasToNumber((projectInfoCG.info.market_data.max_supply - projectInfoCG.info.market_data.total_supply).toFixed(2))
                                                        : "-"}</h6>
                                                </div>
                                            </td>
                                            <td className="align-middle text-sm">
                                                <div className="col text-center">
                                                    <p className="text-xs font-weight-bold mb-0">Circulating Supply</p>
                                                    <h6 className="text-sm mb-0">{projectInfoCG.info.market_data.circulating_supply && projectInfoCG.info.market_data.circulating_supply > 0 ?
                                                        addCommasToNumber(projectInfoCG.info.market_data.circulating_supply.toFixed(2))
                                                        : "-"}</h6>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {projectInfoCov && projectInfoCov.tokenHolders && myTokenHolders &&
                        <div id='tokenomics-table' className="col-12 mt-4">
                            <div className='action-buttons-div d-flex flex-row justify-content-start z-index-2'>
                                <button type="button" className="btn btn-orange btn-chart active top-holders m-0" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} onClick={() => updateTokenomicsSubSections("tokenomics-table", "top-holders")}>Top Holders</button>
                                <button type="button" className="btn btn-default btn-chart inactive latest-transactions ms-4 my-0" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} onClick={() => updateTokenomicsSubSections("tokenomics-table", "latest-transactions")}>Latest transactions</button>
                            </div>
                            <div className="card" style={{ borderTopLeftRadius: 0 }}>
                                <div className="card-header pb-0 p-3">
                                    <div className="d-flex justify-content-start">
                                        <h6 className="mb-2">Filter</h6>
                                        <div className="input-group ms-3" style={{ width: "fit-content" }}>
                                            <span className="input-group-text text-body"><ImListNumbered /></span>
                                            <select className="form-control py-0" value={selectedNumberOfRecords} onChange={updateSelectNumberOfRecords}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={15}>15</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table id='top-holders' className="table align-items-center top-holders active">
                                        <tbody>

                                            {projectInfoCG.info && myTokenHolders && myTokenHolders.map((holder, idx) =>
                                            (
                                                <tr key={idx}>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Rank</p>
                                                            <h6 className="text-sm mb-0">{idx + 1}</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Address</p>
                                                            <Link href={`${getChainAddressExplorerUrl(userProject.network.chain_id, holder.contract_address, holder.address)}`}>
                                                                <a target="_blank"><h6 className="text-sm mb-0">{holder.address}</h6></a>
                                                            </Link>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Quantity</p>
                                                            {/* <h6 className="text-sm mb-0">{(holder.balance / holder.contract_decimals).toFixed(0)}</h6> */}
                                                            <h6 className="text-sm mb-0">{addCommasToNumber(parseFloat(ethers.utils.formatUnits(holder.balance, holder.contract_decimals)).toFixed(2))}</h6>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <div className="col text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Percentage</p>
                                                            <h6 className="text-sm mb-0">{((parseFloat(ethers.utils.formatUnits((holder.balance), holder.contract_decimals)) /
                                                                (projectInfoCG.info.market_data.max_supply > 0 && projectInfoCG.info.market_data.max_supply != null
                                                                    ? projectInfoCG.info.market_data.max_supply : projectInfoCG.info.market_data.total_supply)) * 100).toFixed(2)}%</h6>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <div className="col text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Value</p>
                                                            <h6 className="text-sm mb-0">${addCommasToNumber((parseFloat(ethers.utils.formatUnits((holder.balance), holder.contract_decimals)) * projectInfoCG.info.market_data.current_price.usd).toFixed(2))}</h6>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <div className="col text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Analytics</p>
                                                            <Link href={`${getChainAnalyticsExplorerUrl(userProject.network.chain_id, holder.contract_address, holder.address)}`}>
                                                                <a target="_blank"><AiOutlineAreaChart /></a>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table id='latest-transactions' className="table align-items-center latest-transactions d-none">
                                        <tbody>
                                            {myHolderTransactions && myHolderTransactions.map((tx, idx) =>
                                            (
                                                <tr key={idx}>
                                                    <td>
                                                        <div className="text-center">
                                                        <p className="text-xs font-weight-bold mb-0">#</p>
                                                            <h6 className="text-sm mb-0">{idx+1}</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Tx Hash</p>
                                                            <Link href={`${getExplorerTransaction(userProject.network.chain_id, tx.tx_hash)}`}>
                                                                <a target="_blank"><h6 className="text-sm mb-0">{shortAddress(tx.tx_hash)}</h6></a>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">From</p>
                                                            <Link href={`${getExplorerAddress(userProject.network.chain_id, tx.from_address)}`}>
                                                                <a target="_blank"><h6 className="text-sm mb-0">{tx.from_address_label != null ? tx.from_address_label : shortAddress(tx.from_address)}</h6></a>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            <p className="text-xs font-weight-bold mb-0">To</p>
                                                            <Link href={`${getExplorerAddress(userProject.network.chain_id, tx.to_address)}`}>
                                                                <a target="_blank"><h6 className="text-sm mb-0">{tx.to_address_label != null ? tx.to_address_label : shortAddress(tx.to_address)}</h6></a>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <div className="col text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Log</p>
                                                            {tx.log_events && tx.log_events.length > 0 ?
                                                                <Link href={`${getExplorerTransaction(userProject.network.chain_id, tx.tx_hash)}#eventlog`}>
                                                                    <a target="_blank" key={idx}>
                                                                        <h6 className="text-sm mb-0">
                                                                            {/* {tx.log_events.map((log, idx) =>
                                                                            (
                                                                                <span key={idx}>{log.decoded.name}{idx < tx.log_events.length - 1 && ", "}</span>
                                                                            ))} */}
                                                                            <span key={idx}>{tx.log_events[0].decoded ? tx.log_events[0].decoded.name : "-"}</span>
                                                                        </h6>
                                                                    </a>
                                                                </Link>
                                                                : <h6 className="text-sm mb-0">-</h6>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <div className="col text-center">
                                                            <p className="text-xs font-weight-bold mb-0">Date</p>
                                                            <h6 className="text-sm mb-0">{convertToFullDateMarketData(tx.block_signed_at)}</h6>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    ) :
        <div id='tokenomics' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-row h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><MdPieChart color='33374d' /> Tokenomics</h2>
                                    {isLoading &&
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
        </div>
}

export default Tokenomics
import React, { useState, useEffect } from 'react'
import useAppContext from '../../Context'
import { AiFillCaretDown } from "react-icons/ai"
import { RiExchangeBoxFill } from "react-icons/ri"
import { visualizeAnalysisSection, shortAddress, convertToFullDateMarketData, getExplorerTransaction, getExplorerAddress } from '../../../services/myjs'
import Link from 'next/link'
import { ImListNumbered } from "react-icons/im"

function HoldersTransactions() {

    const { projectInfoCG, projectInfoCov, userProject } = useAppContext()

    const [selectedNumberOfTransactions, setSelectedNumberOfTransactions] = useState(5)
    const [myHolderTransactions, setMyTokenTransactions] = useState()

    useEffect(() => {

        if (!projectInfoCov.tokenTransactions || projectInfoCov.tokenTransactions.length == 0) return;
        // console.log(projectInfoCov)
        var myHolderTransactions_ = Object.assign([], projectInfoCov.tokenTransactions)
        setMyTokenTransactions(myHolderTransactions_.slice(0, selectedNumberOfTransactions))
    }, [projectInfoCov])


    function updateSelectNumberOfTransactions(event) {
        if (event.target.value == 5 || event.target.value == 10 || event.target.value == 15 || event.target.value == 20) {
            setSelectedNumberOfTransactions(event.target.value)
            setMyTokenTransactions(projectInfoCov.tokenTransactions.slice(0, event.target.value))
        }
    }

    return projectInfoCG.info && projectInfoCov.tokenTransactions && setMyTokenTransactions ? (
        <div id='holders-transactions' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded" onClick={() => visualizeAnalysisSection("holders-transactions")} style={{ cursor: "pointer" }}>
                                    <h2 className="font-weight-bolder mb-0 expanded"><RiExchangeBoxFill color='33374d' /> Holders Transactions <AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 analysis-div-content">
                <div className="row">
                    <div className="col-12 mt-2">
                        <div className="card ">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-start">
                                    <h6 className="mb-2">Last {selectedNumberOfTransactions} Transactions</h6>
                                    <div className="input-group ms-3" style={{ width: "fit-content" }}>
                                        <span className="input-group-text text-body"><ImListNumbered /></span>
                                        <select className="form-control py-0" value={selectedNumberOfTransactions} onChange={updateSelectNumberOfTransactions}>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                            <option value={20}>20</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-items-center ">
                                    <tbody>
                                        {myHolderTransactions && myHolderTransactions.map((tx, idx) =>
                                        (
                                            <tr key={idx}>
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
                </div>
            </div>
        </div>
    ) :
        <div id='holders-transactions' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><RiExchangeBoxFill color='33374d' /> Holders Transactions</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default HoldersTransactions
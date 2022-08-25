import React from 'react'
import { addCommasToNumber } from '../../services/myjs'
import { updatePoolStatsChart, myToFixedToBigNumbers, toTitleCase } from '../../services/myjs'

function PoolStatsCard({ dex, chain_name }) {

    return (
        <div className="analysis-div-content">
            <div className="row mx-auto">
                <div className="col-lg-12 mt-4 mb-2 d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column h-100 ">
                        <h5 className="font-weight-bolder mb-0">{`${toTitleCase(dex.dex_name)} - ${chain_name}`}</h5>
                    </div>
                    {/* <div>
                        <Link href={`https://pancakeswap.finance/info/pool/${pair.exchange}`}>
                            <a title={`https://pancakeswap.finance/info/pool/${pair.exchange}`} className='font-weight-bolder mb-0 small' target="_blank">View on Pancakeswap <BiLinkExternal /></a>
                        </Link>
                    </div> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-12 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-12 d-flex flex-row justify-content-between">
                                    <div style={{ width: "fit-content" }}>
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Active Pairs 7d</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>{addCommasToNumber(dex.total_active_pairs_7d)}</span>
                                            </h5>
                                        </div>
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">TotalSwaps 24h</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>{dex.total_swaps_24h ? addCommasToNumber(dex.total_swaps_24h) : "-"}</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Fees 24h</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>{dex.total_fees_24h ? "$" + myToFixedToBigNumbers(dex.total_fees_24h) : "-"}</span>
                                            </h5>
                                        </div>
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Volume 30d</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                <span className={`text-sm font-weight-bolder`}>{dex.my_total_volume_30d ? "$" + myToFixedToBigNumbers(dex.my_total_volume_30d) : "-"}</span>
                                                {/* <span className={`text-sm font-weight-bolder`}>{dex.my_total_volume_30d ? "$" + Number(dex.my_total_volume_30d.toFixed(0)) : "-"}</span> */}
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="card mt-2">
                        <div className="card-header pb-0 p-3"><div className="d-flex justify-content-between"><h6 className="mb-2">Tokens </h6></div></div>
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
                    </div> */}
                </div>
                <div className="col-md-8 col-12">
                    <div id={`markets-pool-stats-div-${dex.dex_name}-${dex.chain_id}`} className="card z-index-2">
                        <div className="action-buttons-div pool-price-volume-liquidity-charts card-header p-3 pb-0 d-flex flex-row justify-content-between" >
                            <button type="button" className="btn btn-orange volume active" value={`${dex.dex_name}-${dex.chain_id}`} onClick={() => updatePoolStatsChart(`markets-pool-stats-div-${dex.dex_name}-${dex.chain_id}`, "volume")}>Volume</button>
                            <button type="button" className="btn btn-default liquidity inactive" value={`${dex.dex_name}-${dex.chain_id}`} onClick={() => updatePoolStatsChart(`markets-pool-stats-div-${dex.dex_name}-${dex.chain_id}`, "liquidity")}>Liquidity</button>
                        </div>
                        <div className="card-body p-3">
                            <div className="chart">
                                <canvas id={`dex.my_total_volume_30d-${dex.dex_name}-${dex.chain_id}`} className="chart-canvas volume volume-30-chart" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                                <canvas id={`liquidity30d-${dex.dex_name}-${dex.chain_id}`} className="chart-canvas liquidity liquidity-30-chart d-none" height={300} style={{ display: 'block', boxSizing: 'border-box', height: 300, width: '515.5px' }} width={515} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoolStatsCard
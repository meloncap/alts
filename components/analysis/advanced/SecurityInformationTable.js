import React from 'react'
import { AiFillWarning } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { BsCheckLg } from "react-icons/bs"
import { booleanText } from '../../../services/myjs'

function SecurityInformationTable({ tokenSecurityResults }) {

    return tokenSecurityResults && (
        <div className="table-responsive">
            <table className="table align-items-center top-holders active">
                <tbody>
                    {tokenSecurityResults.is_open_source &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Open source</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether this contract code is open source.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_open_source)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>

                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_open_source == 1 ?
                                            <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }
                    {tokenSecurityResults.is_mintable &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Mintable</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether this contract has the function to mint tokens.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_mintable)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_mintable == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.can_take_back_ownership &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Take back Ownership</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether this contract has the function to take back ownership.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.can_take_back_ownership)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.can_take_back_ownership == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.owner_change_balance &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Owner Can Change Balance</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">If the contract owner has the authority to change the balance of any token holder.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.owner_change_balance)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.owner_change_balance == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <ImCross color={"#ea0606"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.hidden_owner &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Hidden owner</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether the contract has hidden owners.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.hidden_owner)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.hidden_owner == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <ImCross color={"#ea0606"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.buy_tax && tokenSecurityResults.sell_tax &&
                        <>
                            <tr>
                                <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Title</p>
                                        <h6 className="text-sm mb-0">Buy/Sell Taxes</h6>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Description</p>
                                        <h6 className="text-sm mb-0">The tax when buying/selling the token.</h6>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Result</p>
                                        <h6 className="text-sm mb-0">{tokenSecurityResults.buy_tax}% / {tokenSecurityResults.sell_tax}%</h6>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Pass</p>
                                        <h6 className="text-sm mb-0">
                                            {tokenSecurityResults.buy_tax == 0 && tokenSecurityResults.sell_tax == 0 ?
                                                <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                            }
                                        </h6>
                                    </div>
                                </td>
                            </tr>
                            {(tokenSecurityResults.buy_tax > 0 || tokenSecurityResults.sell_tax > 0) && tokenSecurityResults.slippage_modifiable &&
                                <tr>
                                    <td>
                                        <div className="text-center">
                                            <p className="text-xs font-weight-bold mb-0">Title</p>
                                            <h6 className="text-sm mb-0">Modifiable Tax</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            <p className="text-xs font-weight-bold mb-0">Description</p>
                                            <h6 className="text-sm mb-0">Whether the trading tax can be modifiable.</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            <p className="text-xs font-weight-bold mb-0">Result</p>
                                            <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.slippage_modifiable)}</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            <p className="text-xs font-weight-bold mb-0">Pass</p>
                                            <h6 className="text-sm mb-0">
                                                {tokenSecurityResults.slippage_modifiable == 0 ?
                                                    <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                                }
                                            </h6>
                                        </div>
                                    </td>

                                </tr>
                            }

                        </>
                    }

                    {tokenSecurityResults.is_honeypot &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Honeypot</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Wether token maybe cannot be sold because of the token contract's function.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_honeypot)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_honeypot == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <ImCross color={"#ea0606"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.transfer_pausable &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Pausable Transfer</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether trading can be pausable.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.transfer_pausable)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.transfer_pausable == 0 ?
                                            <BsCheckLg color={"#82d616"} /> : <AiFillWarning color={"#EA4D00"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.is_blacklisted &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Blacklist</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether the blacklist function is not included in the contract.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_blacklisted)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_blacklisted == 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.is_whitelisted &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Whitelist</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether the whitelist function is not included in the contract.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_whitelisted)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_whitelisted == 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.is_anti_whale &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Anti Whale</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether it has the function to limit the maximum amount of transactions or the maximum amount of coins held.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.is_anti_whale)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.is_anti_whale == 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.trading_cooldown &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Trading Cooldown</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether it can limit the minimum time between two transactions.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.trading_cooldown)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.trading_cooldown == 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.selfdestruct &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">Self-destruct</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether it can self destruct causing all functions be unavailable, and all related assets be erased.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.selfdestruct)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.selfdestruct != 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                    {tokenSecurityResults.external_call &&
                        <tr>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Title</p>
                                    <h6 className="text-sm mb-0">External Calls</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Description</p>
                                    <h6 className="text-sm mb-0">Whether it has functions calling to other contracts making it highly dependent on them.</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Result</p>
                                    <h6 className="text-sm mb-0">{booleanText(tokenSecurityResults.external_call)}</h6>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <p className="text-xs font-weight-bold mb-0">Pass</p>
                                    <h6 className="text-sm mb-0">
                                        {tokenSecurityResults.external_call != 0 ?
                                            <AiFillWarning color={"#EA4D00"} /> : <BsCheckLg color={"#82d616"} />
                                        }
                                    </h6>
                                </div>
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default SecurityInformationTable
import React, { useEffect } from 'react'
import useAppContext from '../../Context'
import { AiFillCaretDown } from "react-icons/ai"
import { BsFillShieldLockFill } from "react-icons/bs"
import { CopyBlock, github, dracula } from "react-code-blocks"
import { visualizeAnalysisSection } from '../../../services/myjs'
import Link from 'next/link'

function smartContractInfo() {

    const { userProject, themeMode, smartContractAnalysed, setSmartContractAnalysed } = useAppContext()

    useEffect(() => {
        (async () => {

            if (!userProject || !userProject.input || smartContractAnalysed.address == userProject.input) return;

            var source;

            if (userProject.network.chain_id == 1) {
                source = "etherscan";
            } else if (userProject.network.chain_id == 56) {
                source = "bscscan";
            }

            const scContractResponse = await fetch(`/api/${source}/coins/contract/${userProject.input}`)

            if (!scContractResponse.ok) {
                //Show an error
                console.log(scContractResponse)
                return;
            }

            const scContractResult = await scContractResponse.json()
            const scInfo = Object.assign({}, smartContractAnalysed)
            scInfo.address = userProject.input;
            scInfo.info = scContractResult;
            setSmartContractAnalysed(scInfo)

        })()
    }, [userProject, smartContractAnalysed])

    return smartContractAnalysed.info && userProject.input ? (
        <div id='source-code' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-row h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><BsFillShieldLockFill color='#33374d' style={{ width: 30, height: 30 }} />  Source Code</h2>
                                    <div className="d-flex flex-column h-100 analysis-title-div expanded" onClick={() => visualizeAnalysisSection("source-code")} style={{ cursor: "pointer" }}>
                                        <h3 className="text-dark mb-0 up ms-2"><AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-12 analysis-div-content">
                <div className="row">
                    <div className="col-12">
                        <div className="card ">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <Link href={`https://bscscan.com/address/${userProject.input}#code`}>
                                        <a target="_blank" title={`https://bscscan.com/address/${userProject.input}#code`}><h6 className="mb-2">Smart Contract ABI</h6></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-12">
                                        {smartContractAnalysed.info.ABI &&
                                            <CopyBlock
                                                language={"json"}
                                                text={smartContractAnalysed.info.ABI}
                                                showLineNumbers={true}
                                                theme={themeMode == 'light' ? github : dracula}
                                                wrapLines={true}
                                                codeBlock
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 analysis-div-content mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card ">
                            <div className="card-header pb-0 p-3">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2">Smart Contract Information</h6>
                                </div>
                            </div>
                            <div className="card-body p-3" >
                                {smartContractAnalysed.address &&
                                    <div className="row">
                                        <div className="d-flex">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">Address: <span className="address-text font-weight-bolder">{smartContractAnalysed.address}</span></p>
                                            </div>
                                        </div>
                                        {smartContractAnalysed.info.ContractName && smartContractAnalysed.info.ContractName != "" &&
                                            < div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Contract Name: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.ContractName}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.EVMVersion && smartContractAnalysed.info.EVMVersion != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">EVM Version: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.EVMVersion}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.CompilerVersion && smartContractAnalysed.info.CompilerVersion != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Compiler Version: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.CompilerVersion}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.LicenseType && smartContractAnalysed.info.LicenseType != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">License Type: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.LicenseType}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.Implementation && smartContractAnalysed.info.Implementation != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Implementation: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.Implementation}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.library && smartContractAnalysed.info.library != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">library: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.library}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.OptimizationUsed && smartContractAnalysed.info.OptimizationUsed != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Optimization Used: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.OptimizationUsed}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.Proxy && smartContractAnalysed.info.Proxy != "" &&
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Proxy: <span className="address-text font-weight-bolder">{smartContractAnalysed.info.Proxy}</span></p>
                                                </div>
                                            </div>
                                        }

                                        {smartContractAnalysed.info.SourceCode &&
                                            <div className="col-12" >
                                                <CopyBlock
                                                    language={"rust"}
                                                    text={smartContractAnalysed.info.SourceCode}
                                                    showLineNumbers={true}
                                                    theme={themeMode == 'light' ? github : dracula}
                                                    wrapLines={true}
                                                    codeBlock
                                                />
                                            </div>
                                        }

                                    </div>
                                }
                            </div>

                        </div>
                    </div>

                </div>
            </div>




        </div >
    ) :
        <div id='source-code' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><BsFillShieldLockFill color='#33374d' style={{ width: 30, height: 30 }} />  Source Code</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default smartContractInfo
import React, { useEffect } from 'react'
import useAppContext from '../../Context'
import { AiFillCaretDown } from "react-icons/ai"
import { BsFillShieldLockFill } from "react-icons/bs"
import Link from 'next/link';
import { visualizeAnalysisSection } from '../../../services/myjs'
import SecurityInformationTable from './SecurityInformationTable'

function securityInformation() {

    const { userProject, smartContractAnalysed, setSmartContractAnalysed } = useAppContext()

    useEffect(() => {
        (async () => {

            if (!userProject || !userProject.input || smartContractAnalysed.address == userProject.input) return;

            // Contract security
            const contractSecurityResponse = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${userProject.network.chain_id}?contract_addresses=${userProject.input}`)

            if (!contractSecurityResponse.ok) {
                //Show an error
                console.log(contractSecurityResponse)
                return;
            }

            const contractSecurityResult = await contractSecurityResponse.json()

            // Malicious address
            const maliciousAddressResponse = await fetch(`https://api.gopluslabs.io/api/v1/address_security/${userProject.input}?chain_id=${userProject.network.chain_id}`)

            if (!maliciousAddressResponse.ok) {
                //Show an error
                console.log(maliciousAddressResponse)
                return;
            }

            const maliciousAddressResult = await maliciousAddressResponse.json()


            // Update context variable with the 3 data
            const scInfo = Object.assign({}, smartContractAnalysed)
            scInfo.security = Object.assign({
                tokenSecurity: contractSecurityResult.result[Object.keys(contractSecurityResult.result)[0]],
                maliciousAddress: maliciousAddressResult.result
            })
            setSmartContractAnalysed(scInfo)

        })()
    }, [userProject])

    return smartContractAnalysed.security ? (
        <div id='security-info' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-2">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-row h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><BsFillShieldLockFill color='#33374d' style={{ width: 30, height: 30 }} /> Security Information</h2>
                                    <div className="d-flex flex-column h-100 analysis-title-div expanded" onClick={() => visualizeAnalysisSection("security-info")} style={{ cursor: "pointer" }}>
                                        <h3 className="text-dark mb-0 up ms-2"><AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <span className="text-sm mt-1">The data is retrieved from
                                <Link href={'https://gopluslabs.io'}>
                                    <a title='Go+ Security website' target={"_blank"}> <strong>Go+ Security </strong></a>
                                </Link>
                                API. Check out their endpoints through <Link href={'https://docs.gopluslabs.io/reference/quick-start'}>
                                    <a title='Go+ Security API docs' target={"_blank"}> <strong>this link </strong></a>
                                </Link> to know more about each result.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 analysis-div-content">
                <div className="col-12">
                    <div className="card ">
                        <div className="card-header pb-0 p-3">
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-2">Token Results</h6>
                            </div>
                        </div>
                        <SecurityInformationTable tokenSecurityResults={smartContractAnalysed.security.tokenSecurity} />
                    </div>
                </div>
            </div>

        </div >
    ) :
        <div id='security-info' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><BsFillShieldLockFill color='#33374d' style={{ width: 30, height: 30 }} /> Security Information</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default securityInformation
import Head from 'next/head'
import React from 'react'
import SmartContractCode from '../../../components/analysis/advanced/SmartContractCode'
import SecuriyInformation from '../../../components/analysis/advanced/SecurityInformation'
import SarchNav from '../../../components/analysis/SearchNav'


export default function Index() {

    return (
        <>
            <Head>
                <title>AtlSarch - Advanced Analysis</title>
            </Head>
            <SarchNav/>
            <SecuriyInformation />
            <SmartContractCode />
        </>

    )

}
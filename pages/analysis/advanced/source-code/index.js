import Head from 'next/head'
import React from 'react'
import SmartContractCode from '../../../../components/analysis/advanced/SmartContractCode'
import SarchNav from '../../../../components/analysis/SearchNav'


export default function Index() {

    return (
        <>
            <Head>
                <title>AltSearch - Advanced Analysis</title>
            </Head>
            <SarchNav />
            <SmartContractCode />
        </>

    )

}
import Head from 'next/head'
import React from 'react'
import MarketData from '../../../../components/analysis/basic/MarketData'
import SarchNav from '../../../../components/analysis/SearchNav'

export default function Index() {

    return (
        <>
            <Head>
                <title>Analysis - Market Data</title>
            </Head>

            <SarchNav />
            <MarketData />
        </>

    )

}
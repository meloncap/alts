import Head from 'next/head'
import React from 'react'
import GeneralInfo from '../../../components/analysis/basic/GeneralInfo'
import Tokenomics from '../../../components/analysis/basic/Tokenomics'
import SarchNav from '../../../components/analysis/SearchNav'
import PoolsStats from '../../../components/analysis/basic/PoolsStats'

export default function Index() {

    return (
        <>
            <Head>
                <title>AtlSarch - Basic Analysis</title>
            </Head>
            <SarchNav />
            <GeneralInfo />
            <Tokenomics />
            {/* <HoldersTransactions /> */}
            {/* <MarketData /> */}
            <PoolsStats />
        </>


    )

}
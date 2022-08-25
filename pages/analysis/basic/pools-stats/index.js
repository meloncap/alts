import Head from 'next/head'
import React from 'react'
import SarchNav from '../../../../components/analysis/SearchNav'
import PoolsStats from '../../../../components/analysis/basic/PoolsStats'

export default function Index() {

    return (
        <>
            <Head>
                <title>Analysis - Pools Stats</title>
            </Head>

            <SarchNav />
            <PoolsStats />
        </>

    )

}
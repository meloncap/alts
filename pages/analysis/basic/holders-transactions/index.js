import Head from 'next/head'
import React from 'react'
import HoldersTransactions from '../../../../components/analysis/basic/HoldersTransactions'
import SarchNav from '../../../../components/analysis/SearchNav'

export default function Index() {

    return (
        <>
            <Head>
                <title>Analysis - Holders Transfers</title>
            </Head>

            <SarchNav />
            <HoldersTransactions />
        </>

    )

}
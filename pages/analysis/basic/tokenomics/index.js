import Head from 'next/head'
import React  from 'react'
import Tokenomics from '../../../../components/analysis/basic/Tokenomics'
import SarchNav from '../../../../components/analysis/SearchNav'

export default function Index() {

    return (
        <>
            <Head>
                <title>Analysis - Tokenomics</title>
            </Head>

            <SarchNav />
            <Tokenomics />
        </>

    )

}
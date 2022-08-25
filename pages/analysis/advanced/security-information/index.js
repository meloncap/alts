import Head from 'next/head'
import React from 'react'
import SecurityInformation from '../../../../components/analysis/advanced/SecurityInformation';
import SarchNav from '../../../../components/analysis/SearchNav';


export default function Index() {

    return (
        <>
            <Head>
                <title>AltSearch - Advanced Analysis</title>
            </Head>
            <SarchNav />
            <SecurityInformation />            
        </>

    )

}
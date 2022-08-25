import Head from 'next/head'
import React from 'react'
import SarchNav from '../../../../components/analysis/SearchNav'
import GeneralInfo from '../../../../components/analysis/basic/GeneralInfo'

export default function Index() {

    return (
        <>
            <Head>
                <title>Analysis - General Info</title>
            </Head>

            <SarchNav />
            <GeneralInfo />
        </>

    )

}
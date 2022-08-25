import React, { useState, useEffect } from 'react'
import useAppContext from '../Context'
import Select, { createFilter } from 'react-select'
import CustomOption from './CustomOption'
import CustomMenuList from './MenuList'
import supportedPlatforms from '../../public/supportedPlatformsCoinGecko.json'
import { customNavStyles, supportedChainsAnalyzer } from '../../constants/global'
import { toTitleCase } from '../../services/myjs'

function SearchNav() {

    const { setProjectInfoCG, projectInfoCG, setProjectInfoCov, setUserProject, userProject, themeMode, coinGeckoCoinsList, setCoinGeckoCoinsList } = useAppContext()
    const [isAnalyzerLoading, setIsAnalyzerLoading] = useState(false)

    const [isAllCoinsRequested, setIsAllCoinsRequested] = useState(false)

    const [selectedField, setSelectedField] = useState("address")

    var covalentArray = { pools: false, tokenHolders: false }

    // Network select
    // Filter by supported chains
    const supportedPlatformsFiltered = new Array()
    Object.keys(supportedPlatforms).map(key => { supportedChainsAnalyzer.indexOf(supportedPlatforms[key].value) != -1 && supportedPlatformsFiltered.push(supportedPlatforms[key]) })
    const [selectOptions, setSelectOptions] = useState(supportedPlatformsFiltered)


    const [networkSelectedValue, setNetworkSelectedValue] = useState()

    // Input search
    const [selectedProject, setSelectedProject] = useState()


    var coingeckoArray = Object.assign([], projectInfoCG) // Copy variable state to udate it later

    useEffect(() => {
        (async () => {
            if (coinGeckoCoinsList.coinsList.length > 0 || isAllCoinsRequested) return

            const allCoinsResponse = await fetch('/api/coingecko/coins')

            if (!allCoinsResponse.ok) {
                //Show an error
                console.log(allCoinsResponse)
                return
            }
            const allCoinsResult = await allCoinsResponse.json()
            var temp_CoinGeckoCoinsList = Object.assign([], coinGeckoCoinsList)
            temp_CoinGeckoCoinsList.coinsList = allCoinsResult;
            setCoinGeckoCoinsList(temp_CoinGeckoCoinsList)
            setIsAllCoinsRequested(true)
        })()
    })

    useEffect(() => {
        if (coinGeckoCoinsList.coinsList && coinGeckoCoinsList.filteredCoinsList) return
        if (coinGeckoCoinsList.coinsList) {
            const allCoinsForSearchListAddresses = new Array()
            if (coinGeckoCoinsList.coinsList && coinGeckoCoinsList.coinsList.length > 0) {
                Object.keys(coinGeckoCoinsList.coinsList).map(key => {
                    if (Object.keys(coinGeckoCoinsList.coinsList[key].platforms).length > 0 && coinGeckoCoinsList.coinsList[key].id && coinGeckoCoinsList.coinsList[key].name) {
                        var auxId = coinGeckoCoinsList.coinsList[key].id;
                        var auxLabel = coinGeckoCoinsList.coinsList[key].name + " / $" + coinGeckoCoinsList.coinsList[key].symbol.toUpperCase()
                        var ifNull = false;
                        Object.entries(coinGeckoCoinsList.coinsList[key].platforms).forEach(([key, val]) => {
                            !val ? ifNull = true
                                : supportedChainsAnalyzer.indexOf(key) != -1 && allCoinsForSearchListAddresses.push({ value: val, label: auxLabel + " / " + toTitleCase(key) + " / " + val, network: key })//address, name
                        })
                        // In case there's 1 platform but null value
                        // if (Object.keys(coinGeckoCoinsList[key].platforms).length >= 1 && !ifNull && supportedChainsAnalyzer.indexOf(key) != -1) allCoinsForSearchListNames.push({ value: auxId, label: auxLabel })//id, name
                    }
                })
                var temp_CoinGeckoCoinsList = Object.assign([], coinGeckoCoinsList)
                temp_CoinGeckoCoinsList.filteredCoinsList = allCoinsForSearchListAddresses;
                setCoinGeckoCoinsList(temp_CoinGeckoCoinsList)
            }
        }
    }, [coinGeckoCoinsList])




    const inputHandleChange = (project) => {
        if (project && project.value) setSelectedProject(project)
        if (project && project.network && selectOptions) {
            Object.keys(selectOptions)
            var positionSelectedOption = -1;
            Object.keys(selectOptions).map(key => {
                if (selectOptions[key].value == project.network) positionSelectedOption = key;
            })
            if (positionSelectedOption != -1) setNetworkSelectedValue(positionSelectedOption)
        }
    }


    async function getProjectAnalysis() {

        // var filterField = selectedField;
        if (!selectOptions[networkSelectedValue] || !selectOptions[networkSelectedValue].value) {
            toast("Please select a project from the list.")
            return
        }
        var filterNetwork = selectOptions[networkSelectedValue].value;
        var searchInput = selectedProject.value;
        var chainId = selectOptions[networkSelectedValue].chain_id;

        if (userProject.input == searchInput || searchInput == "") {
            toast("Please select a different project from the list to execute a new analysis.")
            return
        }

        setIsAnalyzerLoading(true)
        // Reset Context Variables
        setProjectInfoCG(false)
        setProjectInfoCov(false)

        // setUserProject({ field: filterField, network: networkSelectedValue, input: searchInput })
        setUserProject({ network: selectOptions[networkSelectedValue], input: searchInput })


        Promise.all([getTokenInfo(filterNetwork, searchInput), getHistoricalPrice(filterNetwork, searchInput)]).then(values => {
            coingeckoArray.info = values[0];
            coingeckoArray.historicalMarket = values[1];
            setProjectInfoCG(coingeckoArray)
        })

        Promise.all([getHolders(chainId, searchInput), getPools(chainId, searchInput), getTokenTransf(chainId, searchInput)]).then(values => {
            covalentArray.tokenHolders = values[0];
            covalentArray.pools = values[1];
            covalentArray.tokenTransactions = values[2];
            setProjectInfoCov(covalentArray)
            setIsAnalyzerLoading(false)
        })
    }

    async function getTokenInfo(network, address) {

        const tokenInfoResponse = await fetch(`/api/coingecko/coins/info/${network}/${address}`)

        if (!tokenInfoResponse.ok) {
            //Show an error
            console.log(tokenInfoResponse)
            return
        }
        return await tokenInfoResponse.json()
    }

    async function getHistoricalPrice(network, address) {

        const tokenHistoricalPriceResponse = await fetch(`/api/coingecko/coins/historicalprice/${network}/${address}`)

        if (!tokenHistoricalPriceResponse.ok) {
            //Show an error
            console.log(tokenHistoricalPriceResponse)
            return
        }
        return await tokenHistoricalPriceResponse.json()
    }

    async function getHolders(chain_id, address) {

        const tokenHoldersResponse = await fetch(`/api/covalent/coins/holders/${chain_id}/${address}`)

        if (!tokenHoldersResponse.ok) {
            //Show an error
            console.log(tokenHoldersResponse)
            return
        }
        return await tokenHoldersResponse.json()
    }

    async function getTokenTransf(network, address) {

        const tokenTransactionsResponse = await fetch(`/api/covalent/coins/transactions/${network}/${address}`)

        if (!tokenTransactionsResponse.ok) {
            //Show an error
            console.log(tokenTransactionsResponse)
            return
        }
        return await tokenTransactionsResponse.json()
    }

    async function getPools(chain_id, address) {

        const tokenPoolsResponse = await fetch(`/api/covalent/coins/pools/${chain_id}/${address}`)

        if (!tokenPoolsResponse.ok) {
            //Show an error
            console.log(tokenPoolsResponse)
            return
        }
        return await tokenPoolsResponse.json()
    }

    // Disabled functions at this moment
    function updateSelectedField(event) {
        if (event && event.target.value) {
            if (event.target.value == "name") setNetworkSelectedValue(false)
            setSelectedField(event.target.value)
        }
    }

    const networkHandleChange = (network) => {
        if (network && network.value && selectOptions) {
            Object.keys(selectOptions)
            var positionSelectedOption = -1;
            Object.keys(selectOptions).map(key => {
                if (selectOptions[key].value == network.value) setNetworkSelectedValue(key)
            })
        }
    }

    return (
        <div className='row justify-content-start mx-auto align-middle'>

            {/* <div className="col-auto" style={{ zIndex: 5 }}>
                <div className="input-group">
                    <span className="input-group-text text-body"><AiFillFilter /></span>
                    <select id='filter-field' className="form-control ps-0" value={selectedField} onChange={updateSelectedField} >
                        <option value={-1}>Filter</option>
                        <option value={"address"}>Address</option>
                        <option value={"name"}>Name</option>
                    </select>
                </div>
            </div> */}

            {/* <div id='filter-network' className="col-auto">
                <Select placeholder={"Select Network"}
                    onChange={networkHandleChange}
                    instanceId='filter-network'
                    value={(selectOptions && networkSelectedValue) && selectOptions[networkSelectedValue]}
                    options={selectOptions}
                    styles={customNavStyles}
                />
            </div> */}

            <div className="col-lg-10 col-12 mt-md-0 mt-2 d-flex align-items-center">
                <div className="input-group d-flex flex-row">
                    <div style={{ width: "100%" }}>
                        <Select
                            placeholder={`Search by ${projectInfoCG.info && selectedProject && selectedProject.label ? selectedProject.label : selectedField == "address" ? "name, symbol or address..." : "name or symbol..."}`}
                            instanceId='filter-project'
                            options={coinGeckoCoinsList.filteredCoinsList.length > 0 ? coinGeckoCoinsList.filteredCoinsList : []}
                            classNamePrefix="custom-select"
                            filterOption={createFilter({ ignoreAccents: false })}
                            components={{ Option: CustomOption, MenuList: CustomMenuList }}
                            onChange={inputHandleChange}
                            isClearable
                            styles={customNavStyles}
                        />
                    </div>
                </div>
            </div>

            <div className='col-md-auto col-12 d-flex align-middle mt-lg-0 mt-2 d-lg-none'>
                <p className='m-0 pt-1' style={{ fontSize: 13 }}>Supported Chains: Ethereum and BNB Chain.</p>
            </div>

            <div className='col-md-auto col-12 d-flex align-middle mt-lg-0 mt-2'>
                {isAnalyzerLoading ?
                    <div className='btn btn-outline-orange btn-sm mb-0 me-3 py-0' style={{ width: "100%", height: "auto" }}>
                        <div className="spinner-border" role="status" >
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <button type='button' className="btn btn-outline-orange btn-sm mb-0 me-3" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard" onClick={getProjectAnalysis} style={{ width: "100%", height: "auto" }}>ANALYZE</button>
                }
            </div>

            <div className='col-auto d-flex align-middle mt-lg-0 mt-2 d-lg-block d-none'>
                <p className='m-0 pt-1' style={{ fontSize: 13 }}>Supported Chains: Ethereum and BNB Chain.</p>
            </div>


        </div>
    )
}

export default SearchNav
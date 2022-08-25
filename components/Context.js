import React, { useContext, createContext } from 'react';

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
    const [projectInfoCG, setProjectInfoCG] = React.useState({ info: false, historicalMarket: false, allCoins: false, allPlatforms: false });
    const [projectInfoCov, setProjectInfoCov] = React.useState({ pools: false, tokenHolders: false, tokenTransactions: false });
    const [userProject, setUserProject] = React.useState(false);
    const [smartContractAnalysed, setSmartContractAnalysed] = React.useState({ address: false, info: false, security: false });
    const [coinGeckoCoinsList, setCoinGeckoCoinsList] = React.useState({coinsList: false, filteredCoinsList: false});
    const [themeMode, setThemeMode] = React.useState("light");

    //
    const values = React.useMemo(() => (
        {
            projectInfoCG, setProjectInfoCG,
        }),
        [
            projectInfoCG]);

    const values2 = React.useMemo(() => (
        { projectInfoCov, setProjectInfoCov }
    ),
        [projectInfoCov]
    );

    const values3 = React.useMemo(() => (
        { userProject, setUserProject }
    ),
        [userProject]
    );

    const values4 = React.useMemo(() => (
        { themeMode, setThemeMode }
    ),
        [themeMode]
    );

    const values5 = React.useMemo(() => (
        { smartContractAnalysed, setSmartContractAnalysed }
    ),
        [smartContractAnalysed]
    );

    const values6 = React.useMemo(() => (
        { coinGeckoCoinsList, setCoinGeckoCoinsList }
    ),
        [coinGeckoCoinsList]
    );


    return (
        <>
            <AppContext.Provider value={{
                projectInfoCG, setProjectInfoCG, projectInfoCov, setProjectInfoCov, userProject, setUserProject, themeMode, setThemeMode, smartContractAnalysed, setSmartContractAnalysed,
                coinGeckoCoinsList, setCoinGeckoCoinsList
            }}>
                {children}
            </AppContext.Provider>
        </>
    )

}

//
export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error deploying App Context!!!');
    }
    return context;
}

export default useAppContext;
const themeMode = "light" //Default

const customNavStyles = {
    control: (base, state) => ({
        ...base,
        background: "#ffffff",
        borderRadius: "0.5rem",
        borderColor: state.isFocused ? "#000000" : "#33374D",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            borderColor: state.isFocused ? "#000000" : "#33374D"
        }
    }),
    option: (provided, state) => (themeMode == 'light' ?
        {
            ...provided,
            fontWeigth: state.isSelected ? '600' : 'initial',
            background: "#ffffff",
            backgroundColor: state.isSelected ? "#EA4D00" : "#ffffff",
            boxShadow: state.isSelected ? null : null,
            "&:hover": {
                backgroundColor: state.isSelected ? "#EA4D00" : state.isFocused ? "#EA4D00" : "#EA4D00",
                color: state.isSelected ? "#fffffff" : state.isFocused ? '#33374D' : '#ffffff'
            },
            zIndex: 40,
        } :
        {
            ...provided,
            background: state.isFocused ? '#919191' : '#141728',
            color: state.isFocused ? '#fff' : 'intial',
            fontWeigth: state.isSelected ? '600' : 'initial',
            zIndex: 40,
        }),
}

const supportedChainsAnalyzer = ["binance-smart-chain", "ethereum"]

// Toaster

const toastStlye = {
    border: '1px solid #EA4D00',
    padding: '16px',
    color: '#EA4D00',
}

const toastIconTheme = {
    primary: '#EA4D00',
    secondary: '#33374D'
}

const coinsNotToShow = [
    "tether", "usd-coin", "ripple", "terrausd", "binance-usd", "dogecoin", "staked-ether",
    "shiba-inu", "wrapped-bitcoin", "dai", "bitcoin-cash", "bonded-luna"
]


export {
    customNavStyles, supportedChainsAnalyzer,
    toastStlye, toastIconTheme,
    coinsNotToShow
}
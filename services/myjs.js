import $ from 'jquery';
import supportedDEXesCovalent from '../public/supportedDEXesCovalent.json';
import supportedChainsCovalent from '../public/supportedChainsCovalent.json';

export function visualizeStatsSection(id) {

    var divToShowHide = $(`#${id}`).find('.stats-div-content');
    var divToChangeArrow = $(`#${id}`).find('.stats-title-div h2');
    var arrowToChange = $(`#${id}`).find('.stats-title-div h2 > svg');

    // Div to change the arrow's direction
    if (divToChangeArrow.hasClass('expanded')) {
        divToChangeArrow.removeClass('expanded');
        divToChangeArrow.addClass('unexpanded');
        arrowToChange.css("transform", "rotate(180deg)")
    } else if (divToChangeArrow.hasClass('unexpanded')) {
        divToChangeArrow.removeClass('unexpanded');
        divToChangeArrow.addClass('expanded');
        arrowToChange.css("transform", "")
    }

    // Div to show and hide
    if (divToShowHide.hasClass('expanded')) {
        divToShowHide.removeClass('expanded');
        divToShowHide.addClass('unexpanded d-none');
    } else if (divToShowHide.hasClass('unexpanded')) {
        divToShowHide.removeClass('unexpanded d-none');
        divToShowHide.addClass('expanded');
    }


}

export function addCommasToNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function convertToFullDateMarketData(_date) {

    var newDate = new Date(_date);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: false, minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };
    newDate = newDate.toLocaleDateString("en-EN", options);

    return newDate;
}

export function shortAddress(addr) {
    return addr.substring(0, 4) + "..." + addr.substring(addr.length - 3);
}

export function onlyUniqueArrayValues(value, index, self) {
    return self.indexOf(value) === index;
}

export function convertLabelsToTile(labels) {
    for (let index = 0; index < labels.length; index++) {
        labels[index] = toTitleCase(labels[index]);
    }

    return labels;
}

export function getDEXEsNames(dexes) {

    var dexesNamesArray = new Array();
    for (let index = 0; index < dexes.length; index++) {
        dexesNamesArray.push(dexes[index].dex_name);
    }

    return dexesNamesArray;
}

export function updatePoolStatsChart(divId, clickedTypeChart) {

    // Get elements
    var generalDiv = $(`#${divId}`);
    var actionButtons = generalDiv.find('.action-buttons-div > button');
    var clickedButton = generalDiv.find(`.action-buttons-div > button.${clickedTypeChart}`);
    var spanTitle = generalDiv.find('.type-title');
    var charts = generalDiv.find('.chart > canvas');
    var chartsToShow = generalDiv.find(`.chart > canvas.${clickedTypeChart}`);


    //Reset all buttons and charts
    for (let index = 0; index < charts.length; index++) {
        actionButtons[index].classList.remove("active");
        actionButtons[index].classList.add("inactive");
        actionButtons[index].classList.remove("btn-orange");
        actionButtons[index].classList.remove("btn-default");
        actionButtons[index].classList.add("btn-default");
        charts[index].classList.add("d-none");
    }

    //Set to active the clicked button and its chart
    spanTitle.html(toTitleCase(clickedTypeChart));
    clickedButton.removeClass("btn-default");
    clickedButton.addClass("btn-orange active");
    chartsToShow.removeClass("d-none");
}

export function updatePoolStatsChartMarkets(e) {

    var clickedButton = e.target;
    var buttonValueIDX = clickedButton.value;
    var actionButtons = e.target.offsetParent.childNodes[0].childNodes;

    if (e.target.classList.contains("active")) return;

    for (let index = 0; index < actionButtons.length; index++) {
        if (actionButtons[index].classList.contains("active")) {
            //Syle
            actionButtons[index].classList.remove('btn-secondary');
            actionButtons[index].classList.add('btn-default');
            //State
            actionButtons[index].classList.remove('active');
            actionButtons[index].classList.add('inactive');
            //Hide chart
            if (actionButtons[index].innerHTML.toLowerCase().includes("volume")) {
                document.getElementById(`volume30d-${buttonValueIDX}`).classList.add('d-none');
            } else if (actionButtons[index].innerHTML.toLowerCase().includes("liquidity")) {
                document.getElementById(`liquidity30d-${buttonValueIDX}`).classList.add('d-none');
            } else if (actionButtons[index].innerHTML.toLowerCase().includes("price")) {
                document.getElementById(`price30d-${buttonValueIDX}`).classList.add('d-none');
            }
        } else if (actionButtons[index].classList.contains("inactive") && actionButtons[index].innerHTML.toLowerCase().includes(clickedButton.innerHTML.toLowerCase())) {
            //Syle
            actionButtons[index].classList.remove('btn-default');
            actionButtons[index].classList.add('btn-secondary');
            //State
            actionButtons[index].classList.remove('inactive');
            actionButtons[index].classList.add('active');
            //Show chart
            if (actionButtons[index].innerHTML.toLowerCase().includes("volume")) {
                document.getElementById(`volume30d-${buttonValueIDX}`).classList.remove('d-none');
            } else if (actionButtons[index].innerHTML.toLowerCase().includes("liquidity")) {
                document.getElementById(`liquidity30d-${buttonValueIDX}`).classList.remove('d-none');
            } else if (actionButtons[index].innerHTML.toLowerCase().includes("price")) {
                document.getElementById(`price30d-${buttonValueIDX}`).classList.remove('d-none');
            }
        }

    }

}

export function updateTokenomicsSubSections(divId, clickedTypeTable) {

    // Get elements
    var generalDiv = $(`#${divId}`);
    var actionButtons = generalDiv.find('.action-buttons-div > button');
    var clickedButton = generalDiv.find(`.action-buttons-div > button.${clickedTypeTable}`);
    var tables = generalDiv.find('.table-responsive table');
    var tablesToShow = generalDiv.find(`.table-responsive > .${clickedTypeTable}`);

    //Reset all buttons and tables
    for (let index = 0; index < actionButtons.length; index++) {
        actionButtons[index].classList.remove("active");
        actionButtons[index].classList.add("inactive");
        actionButtons[index].classList.remove("btn-orange");
        actionButtons[index].classList.remove("btn-default");
        actionButtons[index].classList.add("btn-default");
        tables[index].classList.add("d-none");
    }

    //Set to active the clicked button and its chart
    clickedButton.removeClass("btn-default");
    clickedButton.removeClass("inactive");
    clickedButton.addClass("btn-orange active");
    tablesToShow.removeClass("d-none");
}

export function booleanText(value) {
    if (isNaN(value)) return value;
    if (value == 1) return "True";
    if (value == 0) return "False";
    return value;
}

export function toTitleCase(str) {
    if (typeof (str) != "string" || str == null || str == undefined) return "-";
    str = str.replaceAll('-', ' ').replaceAll('_', ' ');
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

export function pagerUrltoTitleCase(str) {
    if (typeof (str) === "string" || str != undefined) {
        if (str == "/") return "Home";
        str = str.replace(/\//g, ' ');
        return str.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }
    return "a";
}

export function visualizeAnalysisSection(e) {

    var generalDiv = $(`#${e}`);
    var clickedText = generalDiv.find('.analysis-title-div')
    var childClickedText = clickedText.find('h2');
    var arrowToChange = clickedText.find('svg.show-hide-arrow-section')
    var divToShowHide = generalDiv.find('.analysis-div-content')

    if (clickedText.hasClass("expanded")) {
        divToShowHide.addClass("d-none");
        clickedText.removeClass("expanded");
        clickedText.addClass("unexpanded");
        childClickedText.removeClass("expanded");
        childClickedText.addClass("unexpanded");
        arrowToChange.css("transform", "rotate(180deg)")
    } else if (clickedText.hasClass("unexpanded")) {
        divToShowHide.removeClass("d-none");
        clickedText.removeClass("unexpanded");
        clickedText.addClass("expanded");
        childClickedText.removeClass("unexpanded");
        childClickedText.addClass("expanded");
        arrowToChange.css("transform", "")
    }
}

export function convertToInternationalCurrencySystem(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(0) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(0) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0) + "K"

                : Math.abs(Number(labelValue));

}

export function myToFixedToBigNumbers(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }

    return convertToInternationalCurrencySystem(x);
}

export function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};

export function updateTheme(e) {
    const t = document.getElementsByTagName("body")[0],
        a = document.querySelectorAll("div:not(.sidenav) > hr"),
        n = document.querySelector(".sidenav"),
        i = document.querySelectorAll(".sidenav.bg-white"),
        l = document.querySelectorAll("div:not(.bg-gradient-dark) hr"),
        s = document.querySelectorAll("button:not(.btn) > .text-dark"),
        r = document.querySelectorAll("span.text-dark, .breadcrumb .text-dark"),
        o = document.querySelectorAll("span.text-white, .breadcrumb .text-white"),
        c = document.querySelectorAll("strong.text-dark"),
        d = document.querySelectorAll("strong.text-white"),
        u = document.querySelectorAll("a.nav-link.text-dark"),
        g = document.querySelectorAll(".text-secondary"),
        m = document.querySelectorAll(".text-white"),
        v = document.querySelectorAll(".bg-gray-100"),
        f = document.querySelectorAll(".bg-gray-600"),
        h = document.querySelectorAll(".btn.btn-link.text-dark, .btn .ni.text-dark"),
        b = document.querySelectorAll(".btn.btn-link.text-white, .btn .ni.text-white"),
        y = document.querySelectorAll(".card.border"),
        p = document.querySelectorAll(".card.border.border-dark"),
        x = document.querySelectorAll(".navbar g"),
        w = document.querySelector(".navbar-brand-img"),
        L = w.src,
        S = document.querySelectorAll(".navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a"),
        k = document.querySelectorAll(".card .nav .nav-link i"),
        q = document.querySelectorAll(".card .nav .nav-link span"),
        A = document.querySelectorAll(".fixed-plugin > .card"),
        C = document.querySelectorAll(".main-content .container-fluid .card");
    if (e == "light") {
        t.classList.remove("dark-version"), n.classList.add("bg-white");
        for (E = 0; E < S.length; E++) S[E].classList.contains("text-dark") && (S[E].classList.add("text-white"), S[E].classList.remove("text-dark"));
        for (E = 0; E < k.length; E++) k[E].classList.contains("text-white") && (k[E].classList.remove("text-white"), k[E].classList.add("text-dark"));
        for (E = 0; E < q.length; E++) q[E].classList.contains("text-white") && q[E].classList.remove("text-white");
        for (E = 0; E < C.length; E++) C[E].classList.add("blur", "shadow-blur");
        for (E = 0; E < A.length; E++) A[E].classList.add("blur");
        for (E = 0; E < a.length; E++) a[E].classList.contains("light") && (a[E].classList.add("dark"), a[E].classList.remove("light"));
        for (E = 0; E < l.length; E++) l[E].classList.contains("light") && (l[E].classList.add("dark"), l[E].classList.remove("light"));
        for (E = 0; E < s.length; E++) s[E].classList.contains("text-white") && (s[E].classList.remove("text-white"), s[E].classList.add("text-dark"));
        for (E = 0; E < o.length; E++) !o[E].classList.contains("text-white") || o[E].closest(".sidenav") || o[E].closest(".card.bg-gradient-dark") || (o[E].classList.remove("text-white"), o[E].classList.add("text-dark"));
        for (E = 0; E < d.length; E++) d[E].classList.contains("text-white") && (d[E].classList.remove("text-white"), d[E].classList.add("text-dark"));
        for (E = 0; E < m.length; E++) m[E].classList.contains("text-white") && (m[E].classList.remove("text-white"), m[E].classList.remove("opacity-8"), m[E].classList.add("text-secondary"));
        for (E = 0; E < f.length; E++) f[E].classList.contains("bg-gray-600") && (f[E].classList.remove("bg-gray-600"), f[E].classList.add("bg-gray-100"));
        for (E = 0; E < x.length; E++) x[E].hasAttribute("fill") && x[E].setAttribute("fill", "#6c757d");
        for (E = 0; E < b.length; E++) b[E].closest(".card.bg-gradient-dark") || (b[E].classList.remove("text-white"), b[E].classList.add("text-dark"));
        for (E = 0; E < p.length; E++) p[E].classList.remove("border-dark");
    } else {
        var B;
        t.classList.add("dark-version");
        for (var E = 0; E < C.length; E++) C[E].classList.contains("blur") && C[E].classList.remove("blur", "shadow-blur");
        for (var E = 0; E < S.length; E++) S[E].classList.contains("text-white") && S[E].classList.remove("text-white");
        for (var E = 0; E < A.length; E++) A[E].classList.contains("blur") && A[E].classList.remove("blur");
        for (var E = 0; E < k.length; E++) k[E].classList.contains("text-dark") && (k[E].classList.remove("text-dark"), k[E].classList.add("text-white"));
        for (var E = 0; E < q.length; E++) q[E].classList.contains("text-sm") && q[E].classList.add("text-white");
        for (var E = 0; E < a.length; E++) a[E].classList.contains("dark") && (a[E].classList.remove("dark"), a[E].classList.add("light"));
        for (var E = 0; E < l.length; E++) l[E].classList.contains("dark") && (l[E].classList.remove("dark"), l[E].classList.add("light"));
        for (var E = 0; E < s.length; E++) s[E].classList.contains("text-dark") && (s[E].classList.remove("text-dark"), s[E].classList.add("text-white"));
        for (var E = 0; E < r.length; E++) r[E].classList.contains("text-dark") && (r[E].classList.remove("text-dark"), r[E].classList.add("text-white"));
        for (var E = 0; E < c.length; E++) c[E].classList.contains("text-dark") && (c[E].classList.remove("text-dark"), c[E].classList.add("text-white"));
        for (var E = 0; E < u.length; E++) u[E].classList.contains("text-dark") && (u[E].classList.remove("text-dark"), u[E].classList.add("text-white"));
        for (var E = 0; E < g.length; E++) g[E].classList.contains("text-secondary") && (g[E].classList.remove("text-secondary"), g[E].classList.add("text-white"), g[E].classList.add("opacity-8"));
        for (var E = 0; E < v.length; E++) v[E].classList.contains("bg-gray-100") && (v[E].classList.remove("bg-gray-100"), v[E].classList.add("bg-gray-600"));
        for (var E = 0; E < h.length; E++) h[E].classList.remove("text-dark"), h[E].classList.add("text-white");
        for (var E = 0; E < i.length; E++) i[E].classList.remove("bg-white");
        for (var E = 0; E < x.length; E++) x[E].hasAttribute("fill") && x[E].setAttribute("fill", "#fff");
        for (E = 0; E < y.length; E++) y[E].classList.add("border-dark");
    }
}

export function getDEXExplorerUrl(chain_id, dex_name, address) {

    if (dex_name == "sushiswap") return `https://app.sushi.com/analytics/pools/${address}?chainId=${chain_id}`

    var dex = supportedDEXesCovalent.filter(function (dex) {
        return (dex.chain_id == chain_id && dex.dex_name == dex_name)
    });
    return dex[0].explorer_url + address;
}

export function getDEXExplorerName(chain_id, dex_name) {

    var dex = supportedDEXesCovalent.filter(function (dex) {
        return (dex.chain_id == chain_id && dex.dex_name == dex_name)
    });
    return dex[0].explorer_name;
}

export function getChainAddressExplorerUrl(chain_id, contract_address, holder_address) {

    if (chain_id == 1) return `https://etherscan.io/token/${contract_address}?a=${holder_address}`;

    if (chain_id == 56) return `https://bscscan.com/token/${contract_address}?a=${holder_address}`;
}

export function getChainAnalyticsExplorerUrl(chain_id, contract_address, holder_address) {

    if (chain_id == 1) return `https://etherscan.io/token/${contract_address}?a=${holder_address}#tokenAnalytics`;

    if (chain_id == 56) return `https://bscscan.com/token/${contract_address}?a=${holder_address}#tokenAnalytics`;
}

export function getTokenExplorerUrl(chain_id, address) {

    if (chain_id == 1) return `https://etherscan.io/token/${address}`;

    if (chain_id == 56) return `https://bscscan.com/token/${address}`;
}

export function getExplorerTransaction(chain_id, address) {

    var url;

    Object.keys(supportedChainsCovalent).map(key => {
        if (supportedChainsCovalent[key].chain_id == chain_id) url = supportedChainsCovalent[key].explorer_transaction_url;
    })

    return url + address;
}

export function getExplorerAddress(chain_id, address) {

    var url;

    Object.keys(supportedChainsCovalent).map(key => {
        if (supportedChainsCovalent[key].chain_id == chain_id) url = supportedChainsCovalent[key].explorer_address_url;
    })

    return url + address;
}





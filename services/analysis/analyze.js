import $ from 'jquery'
import { getTokenInfoByPlatformAndContract } from '../coingecko/general'
import { getPancakeswapPoolsByAddress, getTokenHolders } from '../covalent/general'

export async function analyzeProject(method, platform, project) {


    // 1. Validation of inputs

    // 2. Call to CoinGecko
    var resultCG = await getTokenInfoByPlatformAndContract(platform, project);
    if (!resultCG || resultCG.response) return -1;

    // 3. Call to CoinGecko
    var resultCGHolders = await getTokenHolders(project);
    if (!resultCGHolders || resultCGHolders.response) return -1;

    // 4. Call to Covalent
    var resultCov = await getPancakeswapPoolsByAddress(project);
    if (!resultCov || resultCov.response) return -1;


    var result = new Array();
    result = {
        coingecko: resultCG,
        covalent: {
            pools: resultCov,
            tokenHolders: resultCGHolders
        }
    }

    console.log(result)

    return result;
}
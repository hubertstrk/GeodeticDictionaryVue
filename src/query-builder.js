import {apiKey} from './sensitive.js'
import {getPrimaryLanguage, getOption} from './settings.js'

const createSimpleSearchUrl = (text) => {
  const primaryLanguage = getPrimaryLanguage()
  const option = getOption()
  if ( option === 'loose'){
    text += '*'
  }
  // /
  const baseUrl = 'https://dictionary.search.windows.net/indexes/translations/docs?api-version=2015-02-28'
  const queryParams = `&queryType=simple&searchFields=${primaryLanguage}&search=${text}&searchMode=all`
  const url = baseUrl + queryParams
  return url
}

const createCountUrl = () => {
  return 'https://dictionary.search.windows.net/indexes/translations/docs/$count?api-version=2015-02-28 '
}

const getQueryOptions = () => {
  return {
    method: 'GET',
    headers: { 'Api-Key': apiKey }
  }
}

export {
  createSimpleSearchUrl,
  createCountUrl,
  getQueryOptions
}

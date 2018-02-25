let primaryLanguage = 'german'
let subsidiaryLanguage = 'english'
let option = 'loose'
let theme = 'default'

const getPrimaryLanguage = () => { 
  return primaryLanguage 
}
const getSubsidiaryLanguage = () => { 
  return subsidiaryLanguage 
}

const setPrimaryLanguage = (value) => {
  primaryLanguage = value
  if (primaryLanguage === 'german') {
    subsidiaryLanguage = 'english'
  } else {
    subsidiaryLanguage = 'german'
  }
  setCookie('gddictionary_language', primaryLanguage, 7)
}

const setOption = (value) => {
  option = value
  setCookie('gddictionary_option', option, 7)
}

const getOption = () => {
  return option
}

const setTheme = (value) => {
  theme = value
}

const getTheme = () => { 
  return theme 
}

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  var expires = 'expires='+ d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

const getCookies = () => {
  const language = getCookie('gddictionary_language')
  if ( !language ) {
    setPrimaryLanguage('german')
  } else {
    setPrimaryLanguage(language)
  }

  const option = getCookie('gddictionary_option')
  if ( !option ) {
    setOption('loose')
  } else {
    setOption(option)
  }

  const theme = getCookie('gddictionary_theme')
  if ( !theme ) {
    setTheme('default')
  } else {
    setTheme(theme)
  }
}

const getCookie = (cname) => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return false
}

export {
  getPrimaryLanguage,
  getSubsidiaryLanguage,
  setPrimaryLanguage,
  setOption,
  getOption,
  setTheme,
  getTheme,
  getCookies
}

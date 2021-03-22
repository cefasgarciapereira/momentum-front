export const generateAvatar = (name) => {
    const substrings = name.split(' ');

    if(substrings.length > 1)
        return `${substrings[0][0]}${substrings[1][0]}`.toUpperCase()

    return `${substrings[0][0]}`.toUpperCase()
}

export const parseDate = (date) => {
    const d = new Date(date)

    const hZeros = (n) => n < 10 ? `0${n}` : n

    return `${hZeros(d.getDate())}/${hZeros(d.getMonth())}/${d.getFullYear()}`
}

export const capitalize = ( word ) => {
    return word.replace(/\b\w/g, function(l){ return l.toUpperCase() })
}

export const capitalizeSlug = (slug) => {
    const subs = slug.split(',')
    let newSlug = ''
    subs.forEach(sub => newSlug = newSlug+' '+capitalize(sub))
    return newSlug.replaceAll('-',' ');
}

export const generateAvatar = (name) => {
    const substrings = name.split(' ');

    if (substrings.length > 1)
        return `${substrings[0][0]}${substrings[1][0]}`.toUpperCase()

    return `${substrings[0][0]}`.toUpperCase()
}

export const parseDate = (date) => {
    const d = new Date(date)

    const hZeros = (n) => n < 10 ? `0${n}` : n

    return `${hZeros(d.getDate())}/${hZeros(d.getMonth())}/${d.getFullYear()}`
}

export const capitalize = (word) => {
    return word.replace(/\b\w/g, function (l) { return l.toUpperCase() })
}

export const capitalizeSlug = (slug) => {
    const subs = slug.split(',')
    let newSlug = ''
    subs.forEach(sub => newSlug = newSlug + ' ' + capitalize(sub))
    return newSlug.replaceAll('-', ' ');
}

export const parseError = (err) => {
    try{
        return `${err.response.data.error}`
    }catch(e){
        try{
            return `Um erro inesperado ocorreu durante o login: ${err.message}`
        }
        catch(e){
            return `${e}`
        }
    }
}

export const parseChargeDate = (date) =>{
    let newDate = new Date(date * 1000).toLocaleDateString().split('/')
    return newDate[0]+'/'+newDate[1]
}

export const stripeStatus = (status) => {
    const STATUS = {
        active: 'Ativo',
        past_due: 'Falha no pagamento',
        unpaid: 'Não Pago',
        canceled: 'Cancelado',
        incomplete: 'Incompleto',
        incomplete_expired: "Expirado incompleto: a primeira fatura não foi paga dentro de 23 horas",
        trialing: 'Perído de teste'
    }
    
    return STATUS[status]
}

export const generateAvatar = (name) => {
    const substrings = name.split(' ');

    if(substrings.length > 1)
        return `${substrings[0][0]}${substrings[1][0]}`.toUpperCase()

    return `${substrings[0][0]}`.toUpperCase()
}

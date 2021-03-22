import Prismic from "prismic-javascript"

const apiEndpoint = 'https://easyquant.cdn.prismic.io/api/v2'
const accessToken = 'MC5ZRmYtRGhJQUFDTUFFQVVE.flvvv71T77-977-977-9C--_ve-_ve-_ve-_ve-_vQbvv73vv70ZVCsw77-977-9Ru-_ve-_ve-_vSUk77-977-977-9eQ'
const client = Prismic.client(apiEndpoint, { accessToken })

export const getPosts = async () => {
    const response = await client.query(
        Prismic.Predicates.at('document.type', 'post')
    )
    return response;
}

export const getPostById = async (id) => {
    const response = await client.query(
        Prismic.Predicates.at('document.id', `${id}`)
    )
    return response;
}

export const getAuthor = async (id) => {
    const response = await client.query([
        Prismic.Predicates.at('document.type', 'author'),
        Prismic.Predicates.at('document.id', `${id}`)
    ])
    return response;
}

export const searchPost = async (text) => {
    const response = await client.query([
        Prismic.Predicates.at("document.type", "post"),
        Prismic.Predicates.fulltext("document", `${text}`),
    ])

    return response
}

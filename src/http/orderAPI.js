import { $host } from ".";

export const getOrder = async (track) => {
    const {data} = await $host.get('api/order', {params: {track}})
    console.log(data)
    if (data) return data.status
    else return null
}
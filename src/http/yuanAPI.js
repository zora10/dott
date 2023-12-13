import { $host } from ".";

export const getYuan = async () => {
    const {data} = await $host.get('api/yuan')
    return data
}
'use server'

import { cookies } from "next/headers";

export default async function IsAuth() {

    const cookiesStore = cookies()
    const token = cookiesStore.get("jwt")?.value || undefined

    const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/jwt', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    })
    const data = await res.json()
    if(data.error) {
        return false
    }

    if(data?.detail === 'Jwt verified') {
        return true
    } 
}
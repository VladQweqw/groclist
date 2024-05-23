'use client'

import { List } from "./list";
import { useRouter } from 'next/navigation'

export default function ListDetailComponent(data: listType) {
    const router = useRouter()

    function RemoveList(id: string) {
        
        function getCookie(name: string) {
            const doc = document.cookie.split(name)
            doc.shift()
   
            return doc[0] || ''
         }

         const token = getCookie('jwt=')
     
        const res = fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/list/' + id, {
           method: 'DELETE',
           headers: {
              'Content-Type': 'application/json',
              "Authorization": `${token}`
           },
        })
        .then((resp) => resp.json())
        .then((data) => {
            router.push('/')

        })
        .catch((err) => {
           console.log(`Err: ${err}`);
           
        })
     }

    return (
        <>
            <List list={data} index_list={1} />

            <div className="btns-wrapper">
                <button
                    onClick={() => {
                        RemoveList(data._id)
                    }}
                    className="danger-btn btn">Delete list</button>
            </div>
        </>
    )
}
'use client'

import { useEffect, useState } from "react";
import { List } from "./list";
import { useRouter } from 'next/navigation'

export default function ListDetailComponent(data: listType) {
    const router = useRouter()
    const [list, setList] = useState(data.list)
    
    function updateList(id: string) {       
    
        // console.log(list);
        
        const res = fetch("http://192.168.1.69:3000" + '/list/' + id, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               "Authorization": `${''}`
            },
            body: JSON.stringify(list)
         })
         .then((resp) => resp.json())
         .then((data) => {
            console.log(data);
            
 
         })
         .catch((err) => {
            console.log(`Err: ${err}`);
            
         })
        
    }

    function RemoveList(id: string) {
        function getCookie(name: string) {
            const doc = document.cookie.split(name)
            doc.shift()
   
            return doc[0] || ''
         }

         const token = getCookie('jwt=')
     
        const res = fetch("http://192.168.1.68:3000" + '/list/' + id, {
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
            <List isEditable={data.isEditable!} setList={setList} item_list={list} list={data} index_list={1} />

            <div className="btns-wrapper">
                <button
                    onClick={() => {
                        RemoveList(data._id)
                    }}
                    className="danger-btn btn">Delete list</button>

                     <button
                    onClick={() => {
                        setList([...list, {
                            name: "ADD",
                            isChecked: false,
                            origin_list: list[0].origin_list,
                            _id: `NUL${new Date().getTime()}`
                        }])
                    }}
                    className="secondary-btn btn">Add item</button>
                    <button
                    onClick={() => {
                        updateList(data._id)
                    }}
                    className="secondary-btn btn">Update list</button>
            </div>
        </>
    )
}
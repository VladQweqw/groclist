'use client'

import { useState } from "react"

async function update_list_items(body: {
   list_id: string,
   item_id: string,
   state: boolean,
}, token: string) {

   const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/item", {
      headers: {
         'Content-Type': "application/json",
         'Authorization': `${token}`,
      },
      body: JSON.stringify(body),
      method: 'PUT'
   })

   const data = await res.json()
   return data as any
}

export function ListItem(data: {
   list_item: {
      name: string,
      isChecked: boolean,
      _id: string
   },
   index: number,
   list: listType,
}) {

   const [fakeState, setFakeState] = useState<boolean>(data.list_item.isChecked)

   function getCookie(name: string) {
      const doc = document.cookie.split(name)
      doc.shift()
      
      return doc[0] || ''
   }

   return (
      <div className="list-item" >
         <div className="checkbox-wrapper-4">
            <input
               checked={fakeState}
               onChange={(e) => {

                  update_list_items({
                     list_id: data.list._id,
                     item_id: data.list_item._id,
                     state: !fakeState,
                  }, getCookie('jwt=')).then((result) => {
                     console.log(result);

                     e.target.checked = !fakeState
                     setFakeState(!fakeState)
                  })
                     .catch((err) => {
                        alert(err)
                     })
               }}
               className="inp-cbx" id={`checkbox-${data.index}`} type="checkbox" />
            <label className={`cbx ${fakeState ? "bg-active" : ""}`} htmlFor={`checkbox-${data.index}`}><span>
               <svg width="12px" height="10px">
                  <use xlinkHref="#check-4"></use>
               </svg></span>
               <span>{data.list_item.name}</span>

            </label>
            <svg className="inline-svg">
               <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
               </symbol>
            </svg>
         </div>
      </div>

   )
}
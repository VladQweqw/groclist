'use client'

import { useState } from "react"

async function update_list_items(body: {
   item_id: string,
   state: boolean,
}, token: string) {

   const res = await fetch("http://192.168.1.68:3000" + "/item", {
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

export function ListContainer(data: {
   list: listItemType[],
   list_id: string,
   index_list: number
}) {   
   const list_len = data.list.length
      
   const [totalCompleted, setTotalCompleted] = useState(
      data.list.filter((list) => list.isChecked === true).length
   )

   return (
      <>
        <div className="list-details">
            <p>Total items: {list_len}</p>
            <p className={`${totalCompleted === list_len ? "list-details-completed" : ""}`}>Completed: {totalCompleted}/{list_len}</p>
         </div>

         {data.list.map((list_item: listItemType, index: number) => {
            return <ListItem 
               index={(data.index_list) + index}
               list_item={list_item}
               key={index}
               setTotalCompleted={setTotalCompleted}
            />
         })}
      </>
   )
}

function ListItem(data: {
   list_item: listItemType,
   index: number,
   setTotalCompleted: (args0: any) => void,
}) {
   const [fakeState, setFakeState] = useState<boolean>(data.list_item.isChecked)

   function getCookie(name: string) {
      const doc = document.cookie.split(name)
      doc.shift()

      return doc[0] || ''
   }   

   return(
      <div className="list-item" >
            <div className="checkbox-wrapper-4">
               <input
                  checked={fakeState}
                  onChange={(e) => {

                     update_list_items({
                        item_id: data.list_item._id,
                        state: !fakeState,
                     }, getCookie('jwt=')).then((result) => {
                        console.log(result);
                        
                        if(!fakeState) {
                           data.setTotalCompleted((prev: number) => prev + 1)
                        }else {
                           data.setTotalCompleted((prev: number) => prev - 1)
                        }


                        e.target.checked = !fakeState
                        setFakeState(!fakeState)
                     })
                        .catch((err) => {
                           console.log(err);

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
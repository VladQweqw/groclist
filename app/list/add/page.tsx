'use client'

import { useEffect, useRef, useState } from "react"

export default function Add() {
   const [listItems, setListItems] = useState<number[]>([])
   const form_ref = useRef<HTMLFormElement | null>(null)

   function createListHandler() {
      const arr: {
         name: string,
         isChecked: boolean
      }[] = [];
      
      if(!(form_ref.current!.title as any).value) {
         alert('no title')
      }

      if(form_ref.current?.list_item_name) {
         let items = form_ref.current?.list_item_name

         if(items.length) {
            (form_ref.current?.list_item_name as any).forEach((radio: any) => {
               arr.push({
                  name: radio.value,
                  isChecked: false
               })
            })
         }else {
            arr.push({
               name: items.value,
               isChecked: false
            })
         }
         
      }

      fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/', {
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            title: (form_ref.current!.title as any).value,
            list: arr,
            user: "6640cbc6b8a6148e2febea61"
         }),
         method: 'POST'
      })
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   return(
      <main className="main">
      <div className="form-container center">
         <h1 className="title">Create list</h1>
         
         <form
         ref={form_ref}
         className="form">
            <div className="input">
               <input type="text" name="title" className="input-field" placeholder="List title" id="title" />
            </div>
            {listItems.map((list_item: number, index: number) => {
               return <AddListItem key={index} />
            })}

            <div className="button-wrapper">
               <button 
               onClick={() => {
                  listItems.push(new Date().getTime())
                  setListItems([...listItems])                  
               }}
               type="button"
               className="submit-btn secondary-btn btn">+ Add list item</button>
            </div>

            <div className="button-wrapper">
               <button 
               type="button"
               onClick={createListHandler}
               className="submit-btn primary-btn btn">Create list</button>
            </div>
         </form>
      </div>

 </main>
   )
}

function AddListItem() {
   const [text, setText] = useState<string>('')

   return(
      <div className="input">
         <input 
         type="text" 
         name="list_item_name" 
         className="input-field" 
         value={text}
         onChange={(e) => setText(e.target.value)}
         placeholder="Choose a title" 
          />
      </div>
   )
}
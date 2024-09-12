'use client'
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getFromLocal } from "@/functions/functions"
import { useRouter } from 'next/navigation'
import Link from "next/link"

const trash_svg = require('../../../assets/trashcan.svg')

let id = 0
export default function Add() {
   const [listItems, setListItems] = useState<{
      id: number,
      name: string
   }[]>([])
   const form_ref = useRef<HTMLFormElement | null>(null)

   const [user, setUser] = useState<userType | null>(null)
   const router = useRouter()

   useEffect(() => {
      const user = getFromLocal('user')
      setUser(user)
   }, [])
   
   function removeListItem(id: number) {
      const new_list = listItems.filter((item) => item.id !== id)
      
      console.log(new_list);

      setListItems(() => new_list)
   }

   function addListItem(name: string, id: number) {
      const current_item = listItems.find((item) => item.id === id)
      current_item!.name = name
      
      setListItems([...listItems])      
   } 

   function createListHandler() {

      const arr: {
         name: string,
         isChecked: boolean
      }[] = [];

      if (!(form_ref.current!.title as any).value) {
         alert('no title')
      }

      if(listItems.length === 0) return alert('empty list')

      listItems.forEach((list_item) => {
         if(list_item.name)
            arr.push({
               name: list_item.name,
               isChecked: false
            })
      })
      

      function getCookie(name: string) {
         const doc = document.cookie.split(name)
         doc.shift()

         return doc[0] || ''
      }
      const token = getCookie('jwt=')
      
      fetch("http://localhost:3000" + '/', {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
         },
         body: JSON.stringify({
            title: (form_ref.current!.title as any).value,
            list: arr,
            user: user?._id
         }),
         method: 'POST'
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            router.push('/')
         })
         .catch((err) => {
            console.log(err);
         })
   }

   if (!user) {
      return <main className="main error-main center">
         <span>
            <h1>You are not logged in</h1>
            <p>Please create an account before you continue</p>
         </span>
         <div className="btns-wrapper">
            <Link href={'/register'}>
               <button className="primary-btn btn">Sign up</button>
            </Link>
            <Link href={'/login'}>
               <button className="secondary-btn btn">Login</button>
            </Link>
         </div>
      </main>
   }

   return (
      <main className="main">
         <div className="form-container center">
            <h1 className="title">Create list</h1>

            <form
               ref={form_ref}
               className="form">
               <div className="input">
                  <input type="text" name="title" className="input-field" placeholder="List title" id="title" />
               </div>
               {listItems.map((list_item: {id: number, name: string}, index: number) => {                  
                  return <AddListItem 
                  addListItem={addListItem}
                  removeListItem={removeListItem} 
                  key={list_item.id} 
                  item={list_item}
                  />
               })}

               <div className="button-wrapper">
                  <button
                     onClick={() => {
                        listItems.push({
                           id: id++,
                           name: ''
                        })
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

function AddListItem(data: {
   removeListItem: (args0: number) => void,
   addListItem: (args0: string, args1: number) => void,
   item: {id: number, name: string}
}) {
   const [text, setText] = useState<string>(data.item.name)

   return (
      <div className="input add-list-item">
         <div 
         onClick={(e) => {
            data.removeListItem(data.item.id)
         }}
         className="input-remove-btn">
            <Image
               className="remove-icon"
               src={trash_svg}
               alt="Remove btn"
            ></Image>
         </div>

         <input
            type="text"
            name="list_item_name"
            className="input-field"
            value={text}
            onBlur={() => {
               data.addListItem(text, data.item.id)
            }}
            onChange={(e) => setText(e.target.value)}
            placeholder="Item name"
         />
      </div>
   )
}
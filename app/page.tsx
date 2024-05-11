
'use client'
import { useEffect, useState } from "react";
import { endpoint } from "./login/page"
import Image from "next/image";

const egg = require('../assets/egg.svg')

type listType = {
   _id: string,
   list: string[],
   title: string,
   createdAt: string,
   user: {
      _id: string,
      email: string,
      nickname: string
   }
}

export default function App() {
   const [lists, setLists] = useState<any>(null)

   async function get_lists() {
      await fetch('http://localhost:3000/', {
         headers: {
            'Content-Type': "application/json",
         },
         method: 'GET'
      })
      .then((resp) => resp.json())
      .then((data) => {
         setLists(data.data)
      })
      .catch((err) => {
         console.log(err);
         alert(err)
      })
      
   }
   
   useEffect(() => {
      get_lists()
   }, [])
   
   
   return(
    <main className="main">
      {lists?.map((list: listType, key: number) => {
         return <List list={list} index_list={key} key={key} />
      })}
    </main>
   )
}

function List(data: {
   list: listType,
   index_list: number
}) {   
   return(
      <div className="list">
         <header className="list-header">
            <h1 className="title">{data.list.title}</h1>
            <div className="header-container">
               <p className="list-user">Made by {data.list.user.nickname}</p>
               <p className="list-date">{data.list.createdAt}</p>
            </div>
         </header>
         <div className="list-items">
            {data.list.list.map((list_item: string, index: number) => {
               return <ListItem name={list_item} index={(data.index_list * 10) + index} key={index} />
            })}
         </div>
      </div>
   )
}


function ListItem(data: {
   name: string,
   index: number
}) {


   return(
         <label className="list-item" htmlFor={`checkbox-${data.index}`}>
            <input type="checkbox" name={"checkbox"} id={`checkbox-${data.index}`} className="item-checkbox" />
            <span className="item-image">
               <Image 
               src={egg}
               alt={data.name}
               />
            </span>
            <div className="list-item-name">
               {data.name}
            </div>
         </label>
 
   )
}
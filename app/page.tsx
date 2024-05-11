
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import { Suspense } from "react";
import Loading from "./loading";

import { convertTime } from "@/functions/functions";
import Link from "next/link";

const link_svg = require('../assets/link.svg')

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
      })
      
   }
   
   useEffect(() => {
      get_lists()
   }, [])
   
   
   return(
    <main className="main list-main">
         {lists?.map((list: listType, key: number) => {
            return <Suspense key={key} fallback={<Loading />}>
               <List list={list} index_list={key} key={key} />
            </Suspense>
         })}
    </main>
   )
}

export function List(data: {
   list: listType,
   index_list: number
}) {   
   
   return(
      <div className="list">
         <header className="list-header">
            <Link href={`/list/${data.list._id}`}>
            <h1 className="title">
               <Image
               src={link_svg}
               alt={'Link'}
               />
               {data.list.title}</h1></Link>
            <div className="header-container">
               <p className="list-user">Made by {data.list.user.nickname}</p>
               <p className="list-date">{convertTime(data.list.createdAt).toString()}</p>
            </div>
         </header>
         <div className="list-items">
            <p>Total items: {data.list.list.length}</p>
            {data.list.list.map((list_item: string, index: number) => {
               return <ListItem name={list_item} index={(data.index_list * 10) + index} key={index} />
            })}
         </div>
      </div>
   )
}

export function ListItem(data: {
   name: string,
   index: number
}) {


   return(
         <div className="list-item" >
            <div className="checkbox-wrapper-4">
               <input className="inp-cbx" id={`checkbox-${data.index}`} type="checkbox"/>
               <label className="cbx" htmlFor={`checkbox-${data.index}`}><span>
               <svg width="12px" height="10px">
                  <use xlinkHref="#check-4"></use>
               </svg></span>
               <span>{data.name}</span>
               
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
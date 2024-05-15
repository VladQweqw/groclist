
import { useEffect, useState } from "react";
import Image from "next/image";
 
import { Suspense } from "react";
import Loading from "./loading";

import { convertTime } from "@/functions/functions";
import Link from "next/link";

const link_svg = require('../assets/link.svg')
import { ListItem } from "@/components/listItem";
import { cookies } from "next/headers";

async function get_lists() {
   const cookiesStore = cookies()
   const token = cookiesStore.get("jwt")!.value || undefined
   
   const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/", {
      headers: {
         'Content-Type': "application/json",
         'Authorization': `${token}`,
      },
      method: 'GET'
   })
   
   const data = await res.json()
   return data.data as listType[]
}

export default async function App() {
   const lists = await get_lists()
   
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
               src={JSON.parse(JSON.stringify(link_svg))}
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
            {data.list.list.map((list_item: listItemType, index: number) => {
               return <ListItem list_item={list_item} list={data.list} index={(data.index_list * 10) + index} key={index} />
            })}
         </div>
      </div>
   )
}
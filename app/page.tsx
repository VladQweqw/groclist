

import { Suspense } from "react";
import Loading from "./loading";

import Link from "next/link";

import { cookies } from "next/headers";

import { List } from "@/components/list";

async function get_lists() {
   const cookiesStore = cookies()
   const token = cookiesStore.get("jwt")?.value || undefined
   
   const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "?reverse=true", {
      headers: {
         'Content-Type': "application/json",
         'Authorization': `${token}`,
      },
      method: 'GET'
   })

   const data = await res.json()

   if (data?.error) {
      return data
   }

   return data.data as listType[]
}

export default async function App() {
   const lists = await get_lists()
   
   if (lists.error === 'Invalid token') {
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
      <main className="main list-main">

         {lists?.map((list: listType, key: number) => {
            return <Suspense key={key} fallback={<Loading />}>
               <List list={list} index_list={key} key={key} />
            </Suspense>
         })}
      </main>
   )
}


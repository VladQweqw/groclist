

import React,{} from 'react'
import { useSearchParams } from 'next/navigation'
import { List } from '@/app/page'

async function getDetailList(nodeId: string) {
   const res = await fetch(`http://localhost:3000/list/${params.id}`)
   const data = await res.json()

   return data
}

export default async function ListDetail({ params }: any) {
   const list = await getDetailList(params.id)
   console.log(list);
   


   return(
    <main className="main">
      {/* <List list={} index_list={1} /> */}

    </main>
   )
}
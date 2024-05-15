
import { List } from '@/app/page'

async function getDetailList(id: string) {
   const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/list/' + id)
   const data = await res.json()

   return data as { data: listType}
}

export default async function ListDetail({ params }: { params: {id: string}}) {
   const list = await getDetailList(params.id)
   
   return(
    <main className="main center list-detail-main">
      <List list={list.data} index_list={1} />
      
    </main>
   )
}
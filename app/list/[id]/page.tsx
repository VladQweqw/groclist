
import Link from 'next/link'
import { cookies } from "next/headers";
import ListDetailComponent from '../../../components/listDetail';

async function generateStaticParams() {
   const posts = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/list/').then((res) => res.json())
  
   return posts.map((post: any) => ({
     id: post._id,
   }))
}

async function getDetailList(id: string) {
   const cookiesStore = cookies()
   const token = cookiesStore.get("jwt")?.value || undefined

   const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/list/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         "Authorization": `${token}`
      }
   })
   const data = await res.json()

   if(data?.error) return data
   return data as { data: listType}
}



export default async function ListDetail({ params }: { params: {id: string}}) {
   const list = await getDetailList(params.id)
   
   if(list.error) {
      return <main className="main error-main center">
         <span>
            <h1>Something went wrong</h1>
            <p>Please try again later</p>
         </span>
         <div className="btns-wrapper">
            <Link href={'/'}>
            <button className="primary-btn btn">Go back</button>
            </Link>
         </div>
  </main>
   }
   return(
    <main className="main center list-detail-main">
         <ListDetailComponent {...list.data} />
    </main>
   )
}
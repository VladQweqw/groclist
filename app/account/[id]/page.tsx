import { List } from "@/components/list";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";
import Link from "next/link";

async function getUserDetails(id: string) {
    const cookiesStore = cookies()
    const token = cookiesStore.get("jwt")?.value || undefined
    
    const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/user/' + id, {
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
       }
    })
    const data = await res.json()
    if(data?.error) return data 

    return data.detail as { detail: userType}
 }

export default async function Account({
    params,
    searchParams,
}: any) {
    const id = params.id 
    const user = await getUserDetails(id)

    if(user?.error) {
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

    if(user)
    return(
        <main className="main main-account center">
            <header>
                <h1 className="nickname">{user.nickname}</h1>
                <p className="email">{user.email}</p>
            </header>

            <div className="wrapper">
                <p>Lists by this user:</p>
                <div className="list-main">
                    {user?.lists?.map((list: listType, key: number) => {
                        return <Suspense key={key} fallback={<Loading />}>
                            <List list={list} index_list={key} key={key} />
                        </Suspense>
                    })}
                </div>
            </div>
        </main>
   )
}
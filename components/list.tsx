import Link from "next/link"
import Image from "next/image"
import { convertTime } from "@/functions/functions"
import { ListContainer } from "./listItem"

const link_svg = require('../assets/link.svg')


export function List(data: {
   list: listType,
   index_list: number,
   isEditable: boolean,
   setList: (args0: any) => void,
   item_list: listItemType[],
}) {
   
   return (
      <div className="list">
         <header className="list-header">
            <Link href={`/list/${data.list._id}`}>
               <h1 className="title">
                  <Image
                     src={JSON.parse(JSON.stringify(link_svg))}
                     alt={'Link'}
                  />
                  {data?.list?.title}</h1></Link>
            <Link href={`/user/${data?.list?.user?._id}`}>
               <div className="header-container">
                  <p className="list-user">Made by {data?.list?.user?.nickname}</p>
                  <p className="list-date">{convertTime(data?.list?.createdAt).toString()}</p>
               </div>
            </Link> 
         </header>
         <div className={`list-items list-items-${data.index_list * 10}`}>
            <ListContainer
               item_list={data.item_list}
               setList={data.setList}
               list={data.list.list}
               list_id={data.list._id}
               index_list={data.index_list * 10}
               isEditable={data.isEditable}
            />

         </div>
      </div>
   )
}
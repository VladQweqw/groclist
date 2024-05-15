type listType = {
   _id: string,
   list: listItemType[],
   title: string,
   createdAt: string,
   user: {
      _id: string,
      email: string,
      nickname: string
   }
}

type listItemType = {
   name: string,
   isChecked: boolean,
}
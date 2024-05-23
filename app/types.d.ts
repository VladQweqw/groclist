type listType = {
   _id: string,
   list: listItemType[],
   title: string,
   createdAt: string,
   updatedAt: string,
   user: {
      _id: string,
      email: string,
      nickname: string
   },
}

type listItemType = {
   _id: string,
   name: string,
   isChecked: boolean,
}

type userType = {
   _id: string
   createdAt: string,
   updatedAt: string,
   nickname: string,
   email: string,
   lists: listType[]
}
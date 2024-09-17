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
   isEditable: boolean,
}

type listItemType = {
   _id: string,
   name: string,
   isChecked: boolean,
   origin_list: string,
}

type userType = {
   _id: string
   createdAt: string,
   updatedAt: string,
   nickname: string,
   email: string,
   lists: listType[]
}
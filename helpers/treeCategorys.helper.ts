


export const treeCategorys = (arr:Array<any>,parentId:String='')=>{
    const tree = [];
    arr.forEach(item => {
        if(item.parentId === parentId){
            const newItem = item;
            const childItem:any = treeCategorys(arr,item.id);
            if(childItem.length>0){
                newItem.childItem = childItem;
            }
            tree.push(newItem);
        }
    });
    return tree;
}
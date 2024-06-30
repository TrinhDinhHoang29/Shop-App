export default (objPagination:any,query):any=>{
    if(query.page){
        objPagination.currentPage =parseInt(query.page);
    }
    objPagination.skipItem = (objPagination.currentPage-1)*objPagination.limiteItem;
    objPagination.pageStart = Math.max(1,objPagination.currentPage-2);
    objPagination.pageEnd = Math.min(objPagination.totalPage,objPagination.currentPage+2);
    return objPagination;
}
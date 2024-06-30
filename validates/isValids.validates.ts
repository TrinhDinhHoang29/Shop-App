export const isValidLimiteItem = (value: any): value is ("4"|"6"|"10")=>{
    return value === "4" || value === "6" || value === "10";
}
export const isValidSort = (value: any): value is ("asc"|"desc")=>{
    return value === "asc" || value === "desc";
}
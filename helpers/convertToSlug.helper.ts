import unidecode from "unidecode";
export default (text:string):string=>{
    return unidecode(text.toLocaleLowerCase()).trim().replace(/\s+/g,"-");
}
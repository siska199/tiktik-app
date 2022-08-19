

export const handleFormValidationPost = (form:any)=>{
    for(const key in form){
        if(!form[key]){
            return `Input ${key} cannot be empty!`
        }
    }
}


export const handleFormValidationPost = (form)=>{
    for(const key in form){
        if(!form[key]){
            return `Input ${key} cannot be empty!`
        }
    }
}
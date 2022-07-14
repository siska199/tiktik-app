

export const handleFormValidationPost = (form)=>{
    for(const key in form){
        if(!form[key]){
            return `Please fill input ${key}`
        }
    }
}
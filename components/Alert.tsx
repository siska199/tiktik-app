import React from 'react'

interface PropsAlert {
    type : string;
    message : string;
}

const Alert:React.FC<PropsAlert> = ({type, message}) => {
    let style = ""
    switch(type){
        case "error":
            style = "bg-rose-300 text-rose-800"
            break;
        case "success":
            break
        default :
            break;
    }
  return (
    <section className={`${style} rounded-md p-2 text-sm text-center`}>
        {message}
    </section>
  )
}

export default Alert
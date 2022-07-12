

export const UppercaseTheFirstCharWord = (sentence:string)=>{
    let result = sentence.split(' ').map(word=>{
        return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()
    }).join(' ')
    return result
}


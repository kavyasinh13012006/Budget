export const budgetAdd = (data) => {
    return{
        type:'add',
        payload:data
    }
}

export const budgetExpenstion = (data) => {
    return{
        type:'exp',
        payload:data
    }
}

export const deletUser =(did)=>{
    return{
        type:'delet',
        payload:did
    }
}
//eg 
import React ,{useState} from 'react'


export const useUserInfo = (value:any)=>{
    const [userInfo,setUserInfo] = useState(value)

    return [
        userInfo,
        setUserInfo
    ]

}
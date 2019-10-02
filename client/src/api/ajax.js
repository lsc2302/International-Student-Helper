import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={},type='GET'){
    return new Promise((resolve, reject) =>{
        let promise;
        if (type==='GET'){
            promise = axios.get(url, {params:data})
        }
        else{
            promise = axios.post(url, data)
        }
        promise
            .then(response =>{
                // console.log(response.data)
            resolve(response.data)
        })
            .catch(error=>{
                // console.log(error.message);
            message.error(error.message)
    })
        }
    )
}
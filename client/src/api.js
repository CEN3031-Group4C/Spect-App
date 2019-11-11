import axios from 'axios'


const client = axios.create({
    baseURL: 'localhost:5000/api',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    }
})



export default {
    inputdata(arraydata) {
        let params = arraydata
        client.post('/students',params)
        .then((response) => {
            console.log(response)
        })
    },
    getdata(){
        client.get('/students')
        .then(response => {
            return response
        }).catch((err) => {
            console.log(err)
        })
    },
    async registernewuser(userid){
        client.post('/auth', userid)
        .then(response => {
            return response
        }).catch((err) => {
            console.log(err)
            return null;
        })
    }
}
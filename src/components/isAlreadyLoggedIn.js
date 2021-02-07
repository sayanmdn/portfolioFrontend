import axios from 'axios'


async function isAlreadyLoggedIn() {
    // return true
    const values = localStorage.getItem('token')
    console.log("Token is "+values)
    await axios.post(`http://localhost:8000/post/isAuthenticated`, {"token": values})
    .then (res =>{
        console.log(res)
        if(res.data.code === "tokenValid"){
            // console.log(res.data.code)
            return 1
        }
        else {
            return 0
        }
    })
}

const output = isAlreadyLoggedIn()
console.log("Within func "+output)


export default isAlreadyLoggedIn
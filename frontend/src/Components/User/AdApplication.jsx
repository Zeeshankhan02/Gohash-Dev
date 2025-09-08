import { useRef } from 'react'
import axios from "axios"
function AdApplication() {
  const nameRef = useRef()
  const emailRef = useRef()
  const mobileNoRef = useRef()

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/createAd`,{
        fullname:nameRef.current.value,
        email:emailRef.current.value,
        mobileno:mobileNoRef.current.value
      })

      alert(res.data.msg)
      
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div style={{height:"100vh",marginTop:"14px"}}>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder='fullname'/>
        <input ref={emailRef}type="email" placeholder='email'/>
        <input ref={mobileNoRef} type="text" placeholder='mobile no.'/>
        <button type="submit">Apply for Ad</button>
      </form>
    </div>
  )
}

export default AdApplication
import { Outlet } from 'react-router-dom'
import NavBar from '../User/NavBar'
import Footer from '../User/Footer'

function HomeLayout() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default HomeLayout
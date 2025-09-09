import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav style={{background:"grey"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-around" }}>
      <h1>Gohash</h1>
      <div style={{display:"flex",gap:"20px",alignItems:"center"}}>
        <NavLink to="/general" >General</NavLink>
        <NavLink to="/headlines" >Headlines</NavLink>
        <NavLink to="/apply-for-ads" >Ads</NavLink>
      </div>
    </div>
    </nav>
  )
}

export default NavBar
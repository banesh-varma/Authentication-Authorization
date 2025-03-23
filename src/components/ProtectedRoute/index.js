// import { useEffect } from 'react'
// import { Route, useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import Home from '../Home'

// const ProtectedRoute = props => {
//   const navigate = useNavigate()
//     useEffect(() => {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken === undefined) {
//         navigate('/login', { replace: true }) // Navigate to home if token exists
//     }
//     <Route {...props}/>
//     })
// }
// export default ProtectedRoute
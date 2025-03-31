import Header from '../Header'
import './index.css'

const Cart = () => {
  // const navigate = useNavigate()
  // useEffect(() => {
  //     const jwtToken = Cookies.get('jwt_token')
  //     if (jwtToken === undefined) {
  //       navigate('/login', { replace: true }) // Navigate to login if token doesn't exists
  //     }
  //   }, [navigate])
  return (
  <>
    <Header />
    <div className="cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="cart"
        className="cart-img"
      />
    </div>
  </>
)}

export default Cart

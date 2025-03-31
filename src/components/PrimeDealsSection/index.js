import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import{ScaleLoader} from 'react-spinners'

import ProductCard from '../ProductCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PrimeDealsSection = () =>  {
  const [primeDeals, setPrimeDeals] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const navigate = useNavigate()

  useEffect(() => {
      const getPrimeDeals = async () => {
        setApiStatus(apiStatusConstants.inProgress)
    
        const jwtToken = Cookies.get('jwt_token')
    
        const apiUrl = 'https://apis.ccbp.in/prime-deals'
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok === true) {
          const fetchedData = await response.json()
          const updatedData = fetchedData.prime_deals.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
          }))

          setPrimeDeals(updatedData)
          setApiStatus(apiStatusConstants.success)
        }
        if (response.status === 401) {
          setApiStatus(apiStatusConstants.failure)
        }
      }
      getPrimeDeals()
    }, [navigate])

    const renderPrimeDealsList = () => {
      return (
        <div>
          <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
          <ul className="products-list">
            {primeDeals.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }

    const renderPrimeDealsFailureView = () => (
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="register-prime-image"
      />
    )
  
    const renderLoadingView = () => (
      <div className="products-loader-container">
        <ScaleLoader color="#0b69ff" loading={true} size={20} />
      </div>
    )

  return (
    <>
      {(() => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderPrimeDealsList()
          case apiStatusConstants.failure:
            return renderPrimeDealsFailureView()
          case apiStatusConstants.inProgress:
            return renderLoadingView()
          default:
            return null
        }
      })()}
    </>
  )
}

export default PrimeDealsSection
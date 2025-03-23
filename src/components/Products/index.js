import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import{ScaleLoader} from 'react-spinners'

import Header from '../Header'

import './index.css'

const Products = () => {
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
          navigate('/', { replace: true }) // Navigate to home if token exists
        }
        const getApi = async () => {
          const url = 'https://apis.ccbp.in/products'
          const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
          }
          const response = await fetch(url, options)
          const data = await response.json()
          setIsLoading(false)
          setProductsList([...data.products])
        }
        getApi()
      }, [navigate]
    )
    return (
      <>
        <Header />
        <div className="product-sections">
        <div>
          {isLoading && <ScaleLoader loading={true} color='black' size={20}/>}
            <h1 className="products-list-heading">All Products</h1>
            <ul className="products-list">
              {productsList.map(product => {
              const {
                brand,
                id,
                image_url,
                price,
                rating,
                title
                } = product
              return (
                <li key={id} className="product-item">
                  <img src={image_url} alt="product" className="thumbnail" />
                  <h1 className="title">{title}</h1>
                  <p className="brand">by {brand}</p>
                  <div className="product-details">
                    <p className="price">Rs {price}/-</p>
                    <div className="rating-container">
                      <p className="rating">{rating}</p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star"
                      />
                    </div>
                  </div>
                </li>
              )})}
            </ul>
          </div>
        </div>
    </>
  )
}

export default Products

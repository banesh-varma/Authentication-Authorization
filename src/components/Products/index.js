import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Products = () => {
  return (
    <>
      <Header />
      <div className="product-sections">
        <div>
          <PrimeDealsSection/>
          <AllProductsSection/>
        </div>
      </div>
    </>
  )
}

export default Products

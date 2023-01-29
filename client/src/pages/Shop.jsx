import React from 'react'
import ImageSlider from '../components/ImageSlider'
import ProdcuctCard from '../components/ProductCard'
import { useProduct } from '../context/Product.state'
import { SubHeading } from '../utils/styledComponents/components'

const Shop = () => {

  const productData = useProduct()

    const slides = [
        {url: "https://res.cloudinary.com/dyjzsykk7/image/upload/v1672397008/biscuits_oqpr0x.jpg", title: "biscuits"},
        {url: "https://res.cloudinary.com/dyjzsykk7/image/upload/v1672397005/chocolate-cookies_gz1b3r.jpg", title: "chocolate-cookies"},
        {url: "https://res.cloudinary.com/dyjzsykk7/image/upload/v1672396999/cake_unoleg.jpg", title: "cup-cake"},
    ]
    
  return (
    <>
    <section title='shop-page'>
    <div className='mx-auto w-full h-[220px] sm:h-[280px] lg:h-[340px] xl:h-[400px]'>
    <ImageSlider slides={slides}/>
    </div>
    <div className="products container mx-auto px-4 my-12">
        <SubHeading className='capitalize mb-4'>Our Products</SubHeading>
        <div className='product mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4'>
        {productData && productData.map((data, index)=>(
          <ProdcuctCard key={index} productId={data.id} title={data.title} price={data.price} category={data.category} image={data.img_url}></ProdcuctCard>
        ))}
        </div>
    </div>
    </section>
    </>
  )
}

export default Shop
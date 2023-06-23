import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import './styles.css'
import { ShoppingCartContext } from '../../Context'

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)
  
  return (
    <aside 
    
    className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>{/* modificar comillas para meter logica . (OPEN , CLOSE, U OTRA) // si estas en true va a poner 'flex' sino va a ser 'hidden'*/}
      <div className='flex justify-between iitems-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div>
          <XMarkIcon 
          onClick={() => context.closeProductDetail()}
          className='h-6 w-6 text-black cursor-pointer'/>
        </div>
      </div>
      <figure className='px-6'>
        <img 
        className='w-full h-full rounded-lg' 
        src={context.productToShow.images[0]} 
        alt={context.productToShow.title} 
        />
      </figure>
      <p className='flex flex-col p-6'>
        <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
        <span className='font-medium text-md'>${context.productToShow.title}</span>
        <span className='font-light text-sm'>${context.productToShow.description}</span>
      </p>
    </aside>
  )
}

export default ProductDetail
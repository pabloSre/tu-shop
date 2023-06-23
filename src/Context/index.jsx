import { createContext, useState, useEffect } from 'react';

/* inicio de archivo Global?¡ */
export const ShoppingCartContext = createContext()
//key account
export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  } 

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }
}
export const ShoppingCartProvider = ({children}) => {
  //My account 
  const [account, setAccount] = useState({})

  //Sign out
  const [signOut, setSignOut] = useState(false)
  
  //Shopping Card - Increment quantity
  const [count, setCount] = useState(0)
  //Product Detail - Open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)
  //Checkout Side Menu  - Open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)
  
  //Product Detail - Show product
  const [productToShow, setProductToShow] = useState({
    title:"",
    price:"",
    description:"",
    images: [],
  });

  //Shopping Cart Detail - Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  //shopping Cart - Order
  const [order, setOrder] = useState([])/* necesita ser un array porque va a tener varios parametros */
  //get products
  const [items, setItems] = useState(null)/*  */
  const [filteredItems, setFilteredItems] = useState(null)/*  */
  //Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)
  //Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() =>{
      fetch('https://api.escuelajs.co/api/v1/products')/* hola necesito algo tuyo */
      .then(response => response.json()) /* transformar respuesta en json */
      .then(data => setItems(data))/* almacena la data con setItems */
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }/* si  hay items que los filtre, basado en el titulo
    toLowerCase (no diferencia entre mayusc y minusculas) */
    
    const filteredItemsByCategory = (items, searchByCatergory) => {
      return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }
      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }
      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item =>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
      if (!searchType) {
        return items
      }
    }

    useEffect(() =>{ 
      if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory))
      if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory))
      if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory))
      if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      
    }, [items, searchByTitle, searchByCategory])

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,

      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,

      productToShow,
      setProductToShow,

      cartProducts,
      setCartProducts,
      
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,

      order,
      setOrder,

      items,
      setItems,

      searchByTitle,
      setSearchByTitle,
      
      filteredItems,
      setFilteredItems,

      searchByCategory,
      setSearchByCategory,

      account,
      setAccount,

      signOut,
      setSignOut
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
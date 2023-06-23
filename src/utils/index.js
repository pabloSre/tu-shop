

export const totalPrice = (products) => {/* parametro: tipo:array products // cartProducts: array of objets*/
  let sum = 0 /* vareable que va a ser un acumulador */
  products.forEach(product => sum += product.price)/* aacumulador en 0, el precio del prodcuto se agrega alacumulador */
  return sum/*  0 + el preciod el product "totalprice de la nueva orden." */
}
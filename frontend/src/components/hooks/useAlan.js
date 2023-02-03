import { useEffect, useState, useCallback, useRef } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import { addToCart,removeFromCart,isCartEmpty } from '../../redux/actions/cartActions'
// import storeItems from '../items.json'
// import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CART_RESET_ITEM } from '~/redux/constants/cartConstants';

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
  HOMEPAGE_SHOP: "homepage-shop",
  SEARCH_PRODUCT: "search-product",
}


export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState()
  // const{ setShowCartItems, isCartEmpty,addToCart,removeFromCart,cart,checkout } = useCart()
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems, success: successDeleteCartItem } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCart = useCallback(() => {
    if(isCartEmpty===0) {
      alanInstance.playText("You have no items in your cart")
      // console.log('You have no items in your cart')
    } else {
      alanInstance.playText("Opening your cart")
      // console.log('Your cart')
      // setShowCartItems(true)
      navigate('/cart')
    }
 
  }, [alanInstance,navigate])

  const closeCart = useCallback(() => {
    if(isCartEmpty===0) {
      alanInstance.playText("You have no items in your cart")
      // console.log('You have no items in your cart')
    } else {
      alanInstance.playText("Closing your cart")
      // console.log("Closing your cart")
      // setShowCartItems(false)
    }
    navigate('/')

  }, [alanInstance,navigate])

  const goToHomePage = useCallback(() => {
    console.log("Hoping you have a good time of shopping with us");
    alanInstance.playText("Hoping you have a good time of shopping with us")
    navigate('/')

  }, [alanInstance,navigate])
  const searchProduct = useCallback(({detail: { name }}) => {
    console.log("Searching for"+ name);
    alanInstance.playText("Searching for"+ name)
    navigate(`/search/name/${name}`);

  }, [alanInstance,navigate])
  const additem = useCallback(({detail: { name, quantity }}) => {
    // console.log("Product: ", products);
    if(products){
      const item = products.find(i => i.name.toLowerCase() === name.toLowerCase())
    // console.log('Item: '+ item);
    if(item === null) {
      alanInstance.playText(`I cannot find ${name}`)
    }
    else {
      // console.log('ProductId: '+item._id);
      // console.log('Qty: '+quantity);
      dispatch({ type: CART_RESET_ITEM });
      navigate(`/cart/${item._id}?qty=${quantity}`);
      alanInstance.playText(`Adding ${quantity} of the ${name} to your cart`)
    }
    }
  }, [alanInstance, products, dispatch, navigate])

  const removeitem = useCallback(
    ({detail: { name }}) => {
    const entry = cartItems.find(e => e.name.toLowerCase() === name.toLowerCase())
    console.log("Entry for test: ", entry);
    if(entry) {
      dispatch(removeFromCart(entry.product, name))
      console.log(`Removed ${entry.name} from your cart`);
      alanInstance.playText(`Removed ${entry.name} from your cart`)
    }
    else {
      console.log(`I cannot find the ${name} item in your cart`);
      alanInstance.playText(`I cannot find the ${name} item in your cart`)
    }
    
  }, [alanInstance, cartItems])

  const purchase = useCallback(() => {
    if(isCartEmpty===0) {
      alanInstance.playText("Your cart is empty")
      console.log("Your cart is empty");
    } else {
      alanInstance.playText("Thank you for shopping with us")
      console.log("Thank you for shopping with us");
      if (localStorage.getItem("userInfo")) {
            return navigate('/shipping');
        }
        navigate('/signin?redirect=/shipping');
    }
  }, [alanInstance, navigate])



  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart)
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart)
    window.addEventListener(COMMANDS.HOMEPAGE_SHOP, goToHomePage)
    window.addEventListener(COMMANDS.SEARCH_PRODUCT, searchProduct)
    // window.addEventListener(COMMANDS.ADD_ITEM, additem)
    // window.addEventListener(COMMANDS.REMOVE_ITEM, removeitem)
    // window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchase)


    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart)
      window.removeEventListener(COMMANDS.CLOSE_CART, closeCart)
      window.removeEventListener(COMMANDS.HOMEPAGE_SHOP, goToHomePage)
      window.removeEventListener(COMMANDS.SEARCH_PRODUCT, searchProduct)
      // window.removeEventListener(COMMANDS.ADD_ITEM, additem)
      // window.removeEventListener(COMMANDS.REMOVE_ITEM, removeitem)
      // window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchase)
    }
  }, [openCart])

  useEffect(() => {
    if(products){
    window.addEventListener(COMMANDS.ADD_ITEM, additem)}
    return () => {
      if(products){
      window.removeEventListener(COMMANDS.ADD_ITEM, additem)}
    }
  }, [products])
  useEffect(() => {
    if(cartItems){
      window.addEventListener(COMMANDS.REMOVE_ITEM, removeitem)
      window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchase)
    }
    return () => {
      if(cartItems){
        window.removeEventListener(COMMANDS.REMOVE_ITEM, removeitem)
        window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchase)
      }
    }
  }, [cartItems])
  useEffect(() => {
    if (alanInstance != null) return

    setAlanInstance(
      alanBtn({
        key: '312634a01e333df085da3be122f0e3162e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }))
        }
      })
    )
  }, [])

  return null
}

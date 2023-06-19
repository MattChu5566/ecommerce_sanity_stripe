'use client'

import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const toggleCartItemQuantity = (id, value) => {
        index = cartItems.findIndex((item) => (item._id === id));
        foundProduct = cartItems[index];
        
        if(value === 'inc') {
            setCartItems([...(cartItems.slice(0, index)), {...foundProduct, quantity: foundProduct.quantity + 1}, ...(cartItems.slice(index + 1))]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuanties) => prevTotalQuanties + 1);
        } else if(value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...(cartItems.slice(0, index)), {...foundProduct, quantity: foundProduct.quantity - 1}, ...(cartItems.slice(index + 1))]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuanties) => prevTotalQuanties - 1);
            }
        }
    }

    const onRemove = (id) => {
        index = cartItems.findIndex((item) => (item._id === id));
        foundProduct = cartItems[index];
        setCartItems(cartItems.filter((item) => item._id !== id));
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuanties) => prevTotalQuanties - foundProduct.quantity);
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuanties) => prevTotalQuanties + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + 1
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, product]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`)   
    }

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
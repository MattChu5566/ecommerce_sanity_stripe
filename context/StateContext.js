'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState(1);

    const totalPrice = (cartItems.length == 0) ? 0 : cartItems.reduce((price, item) => price + item.price * item.quantity, 0);
    const totalQuantities = (cartItems.length == 0) ? 0 : cartItems.reduce((q, item) => q + item.quantity, 0);

    let foundProduct;
    let index;

    useEffect(() => {
        if (localStorage.getItem('cartItems')) {
            setCartItems(JSON.parse(localStorage.getItem('cartItems')));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

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
        } else if(value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...(cartItems.slice(0, index)), {...foundProduct, quantity: foundProduct.quantity - 1}, ...(cartItems.slice(index + 1))]);
            }
        }
    }

    const onRemove = (id) => {
        index = cartItems.findIndex((item) => (item._id === id));
        foundProduct = cartItems[index];
        setCartItems(cartItems.filter((item) => item._id !== id));
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

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
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
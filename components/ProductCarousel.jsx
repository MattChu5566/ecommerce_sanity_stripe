'use client';

import React, { useState, useEffect } from 'react'

const ProductCarousel = ({ bannerImgUrl }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const preIndex = (currentIndex + 4 - 1) % 4;
    const nextIndex = (currentIndex + 1) % 4;

    const [buttonCounter, setButtonCounter] = useState(0);

    const [jumpIndex, setJumpIndex] = useState(null);

    useEffect(() => {
        let timeId2;
        const timeId = setTimeout(() => {
            document.querySelector('.img-translate-container').style.transform = `translateX(-100%)`;
            timeId2 = setTimeout(() => {
                setCurrentIndex(nextIndex);
            }, 500)
        }, 3000);

        return () => {
            clearTimeout(timeId);
            clearTimeout(timeId2);
        }
    })

    useEffect(() => {
        const storeButtonCounter = buttonCounter;
        let timeId;
        if (storeButtonCounter < 0) {
            if (storeButtonCounter == -1) {
                document.querySelector('.img-translate-container').style.transform = `translateX(100%)`;
                timeId = setTimeout(() => {
                    setButtonCounter(0);
                    setCurrentIndex((currentIndex + storeButtonCounter + 4) % 4);
                }, 500)
            } else {
                document.querySelector('.img-translate-container').style.transform = `translateX(100%)`;
                document.querySelector('.img-translate-container').style.transitionDuration = `200ms`;
                timeId = setTimeout(() => {
                    setButtonCounter(0);
                    setCurrentIndex((currentIndex + storeButtonCounter + 4) % 4);
                }, 200)
            }
        } else if (storeButtonCounter > 0) {
            if (storeButtonCounter == 1) {
                document.querySelector('.img-translate-container').style.transform = `translateX(-100%)`;
                timeId = setTimeout(() => {
                    setButtonCounter(0);
                    setCurrentIndex((currentIndex + storeButtonCounter + 4) % 4);
                }, 500)
            } else {
                document.querySelector('.img-translate-container').style.transform = `translateX(-100%)`;
                document.querySelector('.img-translate-container').style.transitionDuration = `200ms`;
                timeId = setTimeout(() => {
                    setButtonCounter(0);
                    setCurrentIndex((currentIndex + storeButtonCounter + 4) % 4);
                }, 200)
            }
        }
        return () => {
            clearTimeout(timeId);
        }
    }, [buttonCounter])

    useEffect(() => {
        const storeJumpIndex = jumpIndex;
        let timeId;
        if (storeJumpIndex != null) {
            if (jumpIndex > currentIndex) {
                document.querySelector('.img-translate-container').style.transform = `translateX(-100%)`;
            } else if (storeJumpIndex < currentIndex) {
                document.querySelector('.img-translate-container').style.transform = `translateX(100%)`;
            }
            timeId = setTimeout(() => {
                setJumpIndex(null);
                setCurrentIndex(storeJumpIndex);
            }, 500)
        }
        return () => {
            if (storeJumpIndex != null) {
                clearTimeout(timeId);
                setJumpIndex(null);
                setCurrentIndex(storeJumpIndex);
            }
        }
    }, [jumpIndex])

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center'>
                <button type='button' 
                        onClick={() => {
                            setButtonCounter((buttonCounter) => buttonCounter - 1);
                        }} 
                        className='flex-none w-8 h-8 rounded-md hover:text-orange-600 hover:bg-slate-400 hover:ring-1 ring-inset ring-black active:bg-slate-500'
                >
                    &lt;
                </button>

                <div className='img-window overflow-hidden aspect-[2/0.9] rounded-xl'>
                    {
                        jumpIndex == null ? 
                        <div key={currentIndex} className='img-translate-container transition-transform duration-500 flex relative -left-full'>
                            <img src={bannerImgUrl[preIndex]} className='h-fit' />
                            <img src={bannerImgUrl[currentIndex]} className='h-fit' />
                            <img src={bannerImgUrl[nextIndex]} className='h-fit' />
                        </div> : 
                        <div key={currentIndex} className='img-translate-container transition-transform duration-500 flex relative -left-full'>
                            <img src={bannerImgUrl[jumpIndex]} className='h-fit' />
                            <img src={bannerImgUrl[currentIndex]} className='h-fit' />
                            <img src={bannerImgUrl[jumpIndex]} className='h-fit' />
                        </div>
                    }
                </div>

                <button type='button' 
                        onClick={() => {
                            setButtonCounter((buttonCounter) => buttonCounter + 1);
                        }} 
                        className='flex-none w-8 h-8 rounded-md hover:text-orange-600 hover:bg-slate-400 hover:ring-1 ring-inset ring-black active:bg-slate-500'
                >
                    &gt;
                </button>
            </div>

            <div className='flex justify-center gap-4'>
                {
                    [0, 1, 2, 3].map((item) => {
                        return (
                            <button type='button'
                                    key={item}
                                    onClick={() => {
                                        if (item != currentIndex) setJumpIndex(item);
                                    }} 
                                    className={item == currentIndex ? 'text-orange-600' : 'hover:text-orange-600'}
                            >
                                •
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductCarousel
'use client';

import React, { useState, useEffect, useRef } from 'react'

const ProductCarousel = ({ bannerImgUrl }) => {
    const imgCount = bannerImgUrl.length;

    const renderArray = [];
    for(let i = 0; i < imgCount; i++) {
        renderArray.push(i);
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [jumpIndex, setJumpIndex] = useState(null);
    const preIndex = jumpIndex == +jumpIndex ? jumpIndex : ((currentIndex - 1) >= 0 ? currentIndex - 1 : imgCount - 1);
    const nextIndex = jumpIndex == +jumpIndex ? jumpIndex : ((currentIndex + 1) <= imgCount - 1 ? currentIndex + 1 : 0);

    const ref = useRef(null);

    let timeId;
    const translate = (dir, targetElem, nextCurrentIndex) => {
        targetElem.style.transform = (dir == 'left') ? `translateX(100%)` : `translateX(-100%)`;
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            setCurrentIndex(nextCurrentIndex);
            setJumpIndex(null);
        }, 500)
    }
    
    const handleClick = (dir) => {
        const imgRow = ref.current;
        if (dir == 'left') {
            translate(dir, imgRow, preIndex);
        } else if (dir == 'right') {
            translate(dir, imgRow, nextIndex);
        }   
    }

    const handleDot = (index) => {
        setJumpIndex(index);
        const imgRow = ref.current;
        if (index > currentIndex) {
            translate('right', imgRow, index);
        } else {
            translate('left', imgRow, index);
        }
    }
    
    useEffect(() => {
        const timeId = setTimeout(() => {
            const imgRow = ref.current;
            translate('right', imgRow, nextIndex);
        }, 3000);

        return () => {
            clearTimeout(timeId);
        }
    })

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center'>
                <button type='button' 
                        onClick={() => handleClick('left')} 
                        className='flex-none w-8 h-8 rounded-md hover:text-orange-600 hover:bg-slate-400 hover:ring-1 ring-inset ring-black active:bg-slate-500'>
                    &lt;
                </button>

                <div className='img-window overflow-hidden aspect-[2/0.9] rounded-xl'>
                    <div ref={ref} key={currentIndex} className='img-translate-container transition-transform duration-500 flex relative -left-full'>
                        <img src={bannerImgUrl[preIndex]} className='h-fit' />
                        <img src={bannerImgUrl[currentIndex]} className='h-fit' />
                        <img src={bannerImgUrl[nextIndex]} className='h-fit' />
                    </div>
                </div>

                <button type='button' 
                        onClick={() => handleClick('right')} 
                        className='flex-none w-8 h-8 rounded-md hover:text-orange-600 hover:bg-slate-400 hover:ring-1 ring-inset ring-black active:bg-slate-500'>
                    &gt;
                </button>
            </div>

            <div className='flex justify-center gap-4'>
                {renderArray.map((index) => {
                    return (
                        <button type='button'
                                key={index}
                                onClick={() => {
                                    if (index != currentIndex) handleDot(index);
                                }} 
                                className={index == currentIndex ? 'text-orange-600' : 'hover:text-orange-600'}>
                            •
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductCarousel
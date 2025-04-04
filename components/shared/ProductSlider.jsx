"use client";

import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import ProductCard from "./ProductCard";

const ProductSlider = () => {
  const [cardHeight, setCardHeight] = useState(0);

  const swiperContainerRefForProductAds = useRef(null);
  const resizeObserverRefForProductsAds = useRef(null);

  useEffect(() => {
    const calculateCardHeight = () => {
      const swiperSlide = document.querySelector(".swiper-slide");

      if (swiperSlide) {
        setCardHeight(swiperSlide.clientHeight + 5);
      }
    };

    calculateCardHeight();

    resizeObserverRefForProductsAds.current = new ResizeObserver(
      calculateCardHeight
    );
    if (swiperContainerRefForProductAds.current) {
      resizeObserverRefForProductsAds.current.observe(
        swiperContainerRefForProductAds.current
      );
    }

    return () => {
      if (resizeObserverRefForProductsAds.current) {
        resizeObserverRefForProductsAds.current.disconnect();
      }
    };
  }, []);
  const { data: productsData } = useQuery({
    queryKey: ["/products"],
    queryFn: () => APIKit.public.getProducts().then(({ data }) => data),
  });
  return (
    <Swiper
      modules={[Virtual, Autoplay, Pagination, Navigation]}
      spaceBetween={10}
      // loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: false,
        dynamicBullets: true,
      }}
      breakpoints={{
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1210: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      }}
      // navigation={true}
      navigation={{
        prevEl: ".review-swiper-button-prev",
        nextEl: ".review-swiper-button-next",
      }}
      className="mySwiper !pt-6 !pb-8 [&>.swiper-pagination-bullets]:lg:hidden relative"
      // className="mySwiper !pt-8 !pb-16 lg:!mx-16 [&>.swiper-pagination-bullets]:lg:hidden"
      // className="mySwiper !pt-8 !pb-16 !mx-2 [&>.swiper-pagination-bullets]:lg:hidden [&>.swiper-button-prev]:hidden [&>.swiper-button-next]:hidden [&>.swiper-button-prev]:lg:block [&>.swiper-button-next]:lg:block"
      Virtual
    >
      {productsData?.results.map((item, i) => (
        <SwiperSlide key={i}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
      <div
        style={{ height: cardHeight, width: "auto" }}
        className="absolute z-10 hidden px-6 transition-all transform -translate-x-4 -translate-y-full opacity-0 cursor-pointer group lg:flex lg:items-center hover:opacity-100 duration-400 hover:bg-gradient-to-r hover:from-black/60 hover:via-black/20 hover:to-transparent review-swiper-button-prev"
      >
        {/* <ChevronLeftIcon className="w-16 h-16 transition-opacity duration-300 opacity-0 text-sky-500 group-hover:opacity-100" /> */}
      </div>

      <div
        style={{ height: cardHeight, width: "auto" }}
        className="absolute right-0 z-10 hidden px-6 transition-all transform translate-x-4 -translate-y-full opacity-0 cursor-pointer lg:flex lg:items-center group hover:opacity-100 duration-400 hover:bg-gradient-to-l hover:from-black/60 hover:via-black/20 hover:to-transparent review-swiper-button-next"
      >
        {/* <ChevronRightIcon className="w-16 h-16 transition-opacity duration-300 text-sky-500 group-hover:opacity-100" /> */}
      </div>
    </Swiper>
  );
};

export default ProductSlider;

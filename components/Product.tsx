import Image from "next/image";
import React from "react";
import { urlFor } from "../sanity";
import { BsCart } from "react-icons/bs";
import { useAppDispatch } from "../redux/store";
import { addToCart } from "../redux/basket/slice";
import toast from "react-hot-toast";

type TProductProps = {
  product: Product;
};

const Product: React.FC<TProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const addItemToBasket = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="space-x-3s flex flex-1 items-center justify-between">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>${product.price}</p>
        </div>
        <div
          onClick={addItemToBasket}
          className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px] "
        >
          <BsCart className="h-8 w-8  text-white" />
        </div>
      </div>
    </div>
  );
};

export default Product;

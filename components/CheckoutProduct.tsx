import Image from "next/image";
import React from "react";
import { urlFor } from "../sanity";
import { FiChevronDown } from "react-icons/fi";
import Currency from "react-currency-formatter";
import { useAppDispatch } from "../redux/store";
import { removeFromBasket } from "../redux/basket/slice";
import toast from "react-hot-toast";

type TCheckoutProductProps = {
  items: Product[];
  id: string;
};

const CheckoutProduct: React.FC<TCheckoutProductProps> = ({ items, id }) => {
  const dispatch = useAppDispatch();
  const removeItemFromCart = () => {
    dispatch(removeFromBasket({ id }));
    toast.error(`${items[0].title} removed from the cart`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="lg:wd-96 font-semibold">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <FiChevronDown className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show products details
            <FiChevronDown className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => (total += item.price), 0)}
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromCart}
            className="hover-underline text-blue-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;

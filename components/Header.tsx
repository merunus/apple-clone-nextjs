import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { useAppSelector } from "../redux/store";
import { selectCartData } from "../redux/basket/selectors";

const Header: React.FC = () => {
  const session = false;
  const { items } = useAppSelector(selectCartData);
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="https://rb.gy/vsvv2o"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex items-center justify-center space-x-4 md:w-1/5">
        <IoSearchOutline className="headerIcon" />
        <Link href="checkout">
          <div className="relative cursor-pointer">
            {items.length >= 1 && (
              <span className=" absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <HiOutlineShoppingBag className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            width={34}
            height={34}
            className="cursor-pointer rounded-full"
            alt="Avatar"
          />
        ) : (
          <BiUser className="headerIcon" />
        )}
      </div>
    </header>
  );
};

export default Header;

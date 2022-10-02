import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectBasketTotal, selectCartData } from "../redux/basket/selectors";
import { useAppSelector } from "../redux/store";
import Currency from "react-currency-formatter";
import { FiChevronDown } from "react-icons/fi";
import { Stripe } from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import { Endpoints } from "../models/api-routes";
import getStripe from "../utils/get-stripe";

const Checkout: React.FC = () => {
  const basketTotal = useAppSelector(selectBasketTotal);
  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  );
  const { items } = useAppSelector(selectCartData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const groupedItems = items.reduce((acc, item) => {
      (acc[item._id] = acc[item._id] || []).push(item);
      return acc;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsInCart(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      `${Endpoints.CheckoutSession}`,
      {
        items: items,
      }
    );
    // Internal Server Error Case
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }
    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Cart Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and returns.</p>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>$15.99</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{" "}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <FiChevronDown className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal + 15.99} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="text-col mb-4 flex flex-col font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR <sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>

                    <Button
                      noIcon
                      loading={loading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;

import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { get_product, get_related_products } from "../../redux/actions/product";
import {
  get_items,
  add_item,
  get_total,
  get_item_total,
  remove_item,
} from "../../redux/actions/cart";
import { ReducersStateType } from "../../redux/reducers";
import { FC, useEffect, useState } from "react";
import { ProductType } from "../../redux/reducers/productsReducer";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import ImageGalery from "../../components/product/ImageGalery";
import ProductEsqueleton from "../../components/skeletons/ProductEsqueleton";
import { ItemCart } from "../../redux/reducers/cartReducer";
import { Link } from "react-router-dom";
import { count } from "console";
import { get_reviews } from "../../redux/actions/reviews";
import Stars from "../../components/product/Stars";
interface Props {
  get_product?: Function;
  get_related_products?: Function;
  product_one?: ProductType | any;
  related_products?: ProductType[] | any;
  get_items?: Function;
  add_item?: Function;
  get_total?: Function;
  get_item_total?: Function;
  cart_items?: ItemCart[] | any;
  remove_item?: Function;
  get_reviews?: Function;
  reviews?: any | null;
}

const ProductDetail: FC<Props> = ({
  get_product,
  get_related_products,
  product_one,
  related_products,
  get_items,
  add_item,
  get_total,
  get_item_total,
  cart_items,
  remove_item,
  get_reviews,
  reviews,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [thisProductInCart, setThisProductInCart] = useState(true);
  const [esqueletonLoading, setEsqueletonLoading] = useState(false);
  const productId = params.productId;
  useEffect(() => {
    window.scrollTo(0, 0);
    get_item_total?.();
    get_product?.(productId);
    get_related_products?.(productId);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setEsqueletonLoading(true);
      await get_reviews?.(productId);
      await get_product?.(productId);
      setEsqueletonLoading(false);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [productId]);

  if (esqueletonLoading)
    return (
      <Layout>
        <div>
          <ProductEsqueleton />
        </div>
      </Layout>
    );
  if (product_one == null)
    return (
      <Layout>
        <div>
          <ProductEsqueleton />
        </div>
      </Layout>
    );

  const verifyPRoductInCart = () => {
    let cant = true;
    if (
      cart_items &&
      cart_items !== null &&
      cart_items !== undefined &&
      product_one &&
      product_one !== undefined &&
      product_one !== null
    ) {
      cart_items.map((item: any) => {
        if (parseInt(item.product.id) === parseInt(product_one.id)) {
          cant = false;
        }
      });
      return cant;
    }
  };

  const addToCart = async () => {
    if (
      product_one &&
      product_one !== null &&
      product_one !== undefined &&
      product_one.quantity > 0
    ) {
      setLoading(true);
      await add_item?.(product_one);
      await get_items?.();
      await get_total?.();
      await get_item_total?.();

      setLoading(false);
    }
  };

  const removeItemToCart = async () => {
    if (
      product_one &&
      product_one !== null &&
      product_one !== undefined &&
      product_one.quantity > 0
    ) {
      setThisProductInCart(true);
      await remove_item?.({ product: product_one });
      await get_items?.();
      await get_total?.();
      await get_item_total?.();
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <ImageGalery photo={product_one.photo} />
            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product_one.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">$ {product_one.price}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product_one.description }}
                />
              </div>

              <div className="mt-6">
                <div className="mt-10 flex sm:flex-col1">
                  {verifyPRoductInCart() && thisProductInCart ? (
                    <button
                      type="button"
                      onClick={addToCart}
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      {loading ? <div id="circle5"></div> : "Add to bag"}
                    </button>
                  ) : (
                    <div className="flex flex-col">
                      <span className="flex">
                        <button
                          type="button"
                          className="pl-5 pr-5 border rounded-md mr-3"
                          onClick={removeItemToCart}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                        <Link to="/cart">
                          <button
                            type="button"
                            className=" max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                          >
                            Editar en el Carrito
                          </button>
                        </Link>
                      </span>
                      <span>
                        <b>*</b>
                        <i className="text-sm text-bold">
                          {" "}
                          El producto ya se agrego al carrito
                        </i>
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
              </section>
            </div>

            <div className="bg-white mt-12 mb-12">
              <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-10">
                  Reviews ({reviews && reviews.length})
                </h2>
                <div>
                  {reviews &&
                    reviews.map((review: any, index: number) => (
                      <>
                        <div className="flex">
                          <div className="mx-4 flex-shrink-0">
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <Stars rating={review.rating} />
                            <h4 className="text-lg font-bold">{review.user}</h4>
                            <p className="mt-1">{review.comment}</p>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mb-10">
            <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Productos relacionados
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {related_products !== null &&
                  related_products !== undefined &&
                  related_products?.map((product: any) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <div className="group relative">
                        <div className="border w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                          <img
                            src={product.get_thumbnail}
                            alt=""
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 "
                              />
                              {product.name}
                            </h3>
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
//VIDEO EN 5:39:58
const mapStateToProps = (state: ReducersStateType) => ({
  product_one: state.Products.product,
  related_products: state.Products.related_products,
  cart_items: state.Cart.items,
  reviews: state.Reviews.reviews,
});

export default connect(mapStateToProps, {
  get_product,
  get_related_products,
  get_items,
  add_item,
  get_total,
  get_item_total,
  remove_item,
  get_reviews,
})(ProductDetail);

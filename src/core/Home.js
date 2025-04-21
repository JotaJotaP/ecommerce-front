import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import CartSidebar from "./CartSidebar";
import { Swiper, SwiperSlide } from "swiper/react"; // Import necessary components
import "swiper/swiper-bundle.min.css"; // Import the Swiper styles

// Import Swiper modules (Optional)
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // State to track screen size

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    const loadAllProducts = () => {
        getProducts() // Ensure this API fetches all products without filters
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProduct(data);
                }
            });
    };

    const ajustImage = () => {
        if (window.innerWidth <= 320) {
            return '105px' 
        } 
        if (window.innerWidth > 320 && window.innerWidth <= 375) {
            return '125px'
        }
        if (window.innerWidth > 375 && window.innerWidth <= 425) {
            return '160px'
        }
        if (window.innerWidth > 425 && window.innerWidth <= 768) {
            return '230px'
        }
        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            return '210px'
        }
        if (window.innerWidth > 1024 && window.innerWidth <= 1440) {
            return '300px'
        }
        if (window.innerWidth > 1440) {
            return '570px'
        }
        else {
            return '270px'
        }
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
        loadAllProducts();
    }, []);

    useEffect(() => {
        if (sidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [sidebar]);

    // Track screen size on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) { // If screen is smaller than or equal to 1024px (Tablet and mobile)
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize(); // Check initial screen size

        window.addEventListener("resize", handleResize); // Add event listener on window resize

        return () => {
            window.removeEventListener("resize", handleResize); // Cleanup the event listener
        };
    }, []);

    return (
        <div>
            {sidebar && <CartSidebar setSidebar={setSidebar} />}

            <Layout title="Home Page" description="Node React e-commerce App" className="container-fluid" layoutStyle={{ padding: "35px" }}>
                {/* New Arrivals */}
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {isMobile ? ( // Conditionally render Swiper for mobile and tablet only
                        <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={15}
                        slidesPerView={5} // Match the number of products displayed
                        navigation
                        pagination={{ clickable: true }}
                        loop={false} // Disable looping if you don't have enough items
                        loopFillGroupWithBlank={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 3,  // 1 slide visible on very small screens (mobile)
                                },
                                768: {
                                    slidesPerView: 4,  // 3 slides visible on medium-sized screens (tablets)
                                },
                            }}
                        >
                            {productsByArrival.map((product, i) => (
                                <SwiperSlide key={i}>
                                    <Card
                                        cardPB="45px"
                                        product={product}
                                        imageStyle={{ height: ajustImage(), width: '100%' }}
                                        showAddCartButton={product.quantity === 0 ? false : true}
                                        setSidebar={setSidebar}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // Show the products without Swiper on laptops or larger screens
                        productsByArrival.map((product, i) => (
                            <div className="col-2 mb-3 pl-2 pr-2" key={i}>
                                <Card
                                    cardPB="45px"
                                    product={product}
                                    imageStyle={{ height: `${ajustImage()}`, width: '100%' }}
                                    showAddCartButton={product.quantity === 0 ? false : true}
                                    setSidebar={setSidebar}
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Best Sellers */}
                <h2 className="mb-4 mt-4">Best Sellers</h2>
                <div className="row">
                {isMobile ? ( // Conditionally render Swiper for mobile and tablet only
                        <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={15}
                        slidesPerView={5} // Match the number of products displayed
                        navigation
                        pagination={{ clickable: true }}
                        loop={false} // Disable looping if you don't have enough items
                        loopFillGroupWithBlank={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 3,  // 1 slide visible on very small screens (mobile)
                                },
                                768: {
                                    slidesPerView: 4,  // 3 slides visible on medium-sized screens (tablets)
                                },
                            }}
                        >
                            {productsBySell.map((product, i) => (
                                <SwiperSlide key={i}>
                                    <Card
                                        cardPB="45px"
                                        product={product}
                                        imageStyle={{ height: `${ajustImage()}`, width: '100%' }}
                                        showAddCartButton={product.quantity === 0 ? false : true}
                                        setSidebar={setSidebar}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // Show the products without Swiper on laptops or larger screens
                        productsBySell.map((product, i) => (
                            <div className="col-2 mb-3 pl-2 pr-2" key={i}>
                                <Card
                                    cardPB="45px"
                                    product={product}
                                    imageStyle={{ height: `${ajustImage()}`, width: '100%' }}
                                    showAddCartButton={product.quantity === 0 ? false : true}
                                    setSidebar={setSidebar}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default Home;

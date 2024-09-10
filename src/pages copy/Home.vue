<template>
    <header class="header-area header-style-1 header-height-2">
        <div class="header-top header-top-ptb-1 d-none d-lg-block">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info">
                            <ul>
                                <li><i class="fi-rs-smartphone"></i> <a href="#">(+01) - 2345 - 6789</a></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-4">
                        <div class="logo logo-width-1">
                            <a href="index.html"><img :src="logo" alt="logo"></a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info header-info-right">
                            <ul>
                                <li><i class="fi-rs-user"></i><a href="page-login-register.html">Log In / Sign Up</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="mobile-header-active mobile-header-wrapper-style">
        <div class="mobile-header-wrapper-inner">
            <div class="mobile-header-top">
                <div class="mobile-header-logo">
                    <a href="index.html"><img :src="logo" alt="logo"></a>
                </div>
                <div class="mobile-menu-close close-style-wrap close-style-position-inherit">
                    <button class="close-style search-close">
                        <i class="icon-top"></i>
                        <i class="icon-bottom"></i>
                    </button>
                </div>
            </div>
            <div class="mobile-header-content-area">
                <div class="mobile-search search-style-3 mobile-header-border">
                    <form action="#">
                        <input type="text" placeholder="Search for items…">
                        <button type="submit"><i class="fi-rs-search"></i></button>
                    </form>
                </div>
                <div class="mobile-menu-wrap mobile-header-border">
                    <div class="main-categori-wrap mobile-header-border">
                        <a class="categori-button-active-2" href="#">
                            <span class="fi-rs-apps"></span> Browse Categories
                        </a>
                        <div class="categori-dropdown-wrap categori-dropdown-active-small">
                            <ul>
                                <li><a href="shop-grid-right.html"><i class="evara-font-dress"></i>Women's Clothing</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-tshirt"></i>Men's Clothing</a></li>
                                <li> <a href="shop-grid-right.html"><i class="evara-font-smartphone"></i> Cellphones</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-desktop"></i>Computer & Office</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-cpu"></i>Consumer Electronics</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-home"></i>Home & Garden</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-high-heels"></i>Shoes</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-teddy-bear"></i>Mother & Kids</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-kite"></i>Outdoor fun</a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- mobile menu start -->
                    <nav>
                        <ul class="mobile-menu">
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="index.html">Home</a>
                                <ul class="dropdown">
                                    <li><a href="index.html">Home 1</a></li>
                                    <li><a href="index-2.html">Home 2</a></li>
                                    <li><a href="index-3.html">Home 3</a></li>
                                    <li><a href="index-4.html">Home 4</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="shop-grid-right.html">shop</a>
                                <ul class="dropdown">
                                    <li><a href="shop-grid-right.html">Shop Grid – Right Sidebar</a></li>
                                    <li><a href="shop-grid-left.html">Shop Grid – Left Sidebar</a></li>
                                    <li><a href="shop-list-right.html">Shop List – Right Sidebar</a></li>
                                    <li><a href="shop-list-left.html">Shop List – Left Sidebar</a></li>
                                    <li><a href="shop-fullwidth.html">Shop - Wide</a></li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Single Product</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Product – Right Sidebar</a></li>
                                            <li><a href="shop-product-left.html">Product – Left Sidebar</a></li>
                                            <li><a href="shop-product-full.html">Product – No sidebar</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="shop-filter.html">Shop – Filter</a></li>
                                    <li><a href="shop-wishlist.html">Shop – Wishlist</a></li>
                                    <li><a href="shop-cart.html">Shop – Cart</a></li>
                                    <li><a href="shop-checkout.html">Shop – Checkout</a></li>
                                    <li><a href="shop-compare.html">Shop – Compare</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Mega menu</a>
                                <ul class="dropdown">
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Women's Fashion</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Dresses</a></li>
                                            <li><a href="shop-product-right.html">Blouses & Shirts</a></li>
                                            <li><a href="shop-product-right.html">Hoodies & Sweatshirts</a></li>
                                            <li><a href="shop-product-right.html">Women's Sets</a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Men's Fashion</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Jackets</a></li>
                                            <li><a href="shop-product-right.html">Casual Faux Leather</a></li>
                                            <li><a href="shop-product-right.html">Genuine Leather</a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Technology</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Gaming Laptops</a></li>
                                            <li><a href="shop-product-right.html">Ultraslim Laptops</a></li>
                                            <li><a href="shop-product-right.html">Tablets</a></li>
                                            <li><a href="shop-product-right.html">Laptop Accessories</a></li>
                                            <li><a href="shop-product-right.html">Tablet Accessories</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="blog-category-fullwidth.html">Blog</a>
                                <ul class="dropdown">
                                    <li><a href="blog-category-grid.html">Blog Category Grid</a></li>
                                    <li><a href="blog-category-list.html">Blog Category List</a></li>
                                    <li><a href="blog-category-big.html">Blog Category Big</a></li>
                                    <li><a href="blog-category-fullwidth.html">Blog Category Wide</a></li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Single Product Layout</a>
                                        <ul class="dropdown">
                                            <li><a href="blog-post-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-post-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-post-fullwidth.html">No Sidebar</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Pages</a>
                                <ul class="dropdown">
                                    <li><a href="page-about.html">About Us</a></li>
                                    <li><a href="page-contact.html">Contact</a></li>
                                    <li><a href="page-account.html">My Account</a></li>
                                    <li><a href="page-login-register.html">login/register</a></li>
                                    <li><a href="page-purchase-guide.html">Purchase Guide</a></li>
                                    <li><a href="page-privacy-policy.html">Privacy Policy</a></li>
                                    <li><a href="page-terms.html">Terms of Service</a></li>
                                    <li><a href="page-404.html">404 Page</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Language</a>
                                <ul class="dropdown">
                                    <li><a href="#">English</a></li>
                                    <li><a href="#">French</a></li>
                                    <li><a href="#">German</a></li>
                                    <li><a href="#">Spanish</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <!-- mobile menu end -->
                </div>
                <div class="mobile-header-info-wrap mobile-header-border">
                    <div class="single-mobile-header-info mt-30">
                        <a  href="page-contact.html"> Our location </a>
                    </div>
                    <div class="single-mobile-header-info">
                        <a href="page-login-register.html">Log In / Sign Up </a>
                    </div>
                    <div class="single-mobile-header-info">
                        <a href="#">(+01) - 2345 - 6789 </a>
                    </div>
                </div>
                <div class="mobile-social-icon">
                    <h5 class="mb-15 text-grey-4">Follow Us</h5>
                    <a href="#"><img src="assets/imgs/theme/icons/icon-facebook.svg" alt=""></a>
                    <a href="#"><img src="assets/imgs/theme/icons/icon-twitter.svg" alt=""></a>
                    <a href="#"><img src="assets/imgs/theme/icons/icon-instagram.svg" alt=""></a>
                    <a href="#"><img src="assets/imgs/theme/icons/icon-pinterest.svg" alt=""></a>
                    <a href="#"><img src="assets/imgs/theme/icons/icon-youtube.svg" alt=""></a>
                </div>
            </div>
        </div>
    </div>
    <main class="main">       
        <section class="lazy slider-img" data-sizes="50vw">
            <div class="single-hero-slider single-animation-wrap">
                <div class="container">
                    <div class="row align-items-center slider-animated-1">
                        <div class="col-lg-5 col-md-6">
                            <div class="hero-slider-content-2">
                                <h4 class="animated">Why Yoga Fit?</h4>
                                <h2 class="animated fw-900">Internationally Certified Teachers</h2>
                                <p class="animated">Yoga Fit teachers and instructors are mostly from India. Of course, they are already internationally qualified and certified as a Yoga Teacher. They had taught for several years, if not a dozen years, in numerous nations throughout the world.</p>
                                
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-6">
                            <div class="single-slider-img single-slider-img-1">
                                <img class="animated slider-1-1" :src="slider1" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="single-hero-slider single-animation-wrap">
                    <div class="container">
                        <div class="row align-items-center slider-animated-1">
                            <div class="col-lg-5 col-md-6">
                                <div class="hero-slider-content-2">
                                    <h4 class="animated">FREE 1 ON 1 CONSULTATION WITH OUR TEACHERS</h4>
                                    <p class="animated">You may talk to any of our teachers about whatever you're feeling in your body, and they'll point you in the correct way.</p>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-6">
                                <div class="single-slider-img single-slider-img-1">
                                    <img class="animated slider-1-2" :src="slider2" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-hero-slider single-animation-wrap">
                    <div class="container">
                        <div class="row align-items-center slider-animated-1">
                            <div class="col-lg-5 col-md-6">
                                <div class="hero-slider-content-2">
                                    <h4 class="animated">UNLIMITED 1 MONTH </h4>
                                    <h2 class="animated fw-900">YOGA CLASSES ONLY 699K</h2>
                                    <p class="animated">YOGA IS THE ART OF UNITING  THE MIND, BODY AND SOUL.</p>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-6">
                                <div class="single-slider-img single-slider-img-1">
                                    <img class="animated slider-1-3" :src="slider3" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
        </section>
    
    
        <h3 class="section-title mb-5" style="text-align: center;"><span>Schedule</span> Class</h3>
        <section class="center slider popular-categories section-padding mt-15 mb-5">
            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>

            <div class="card-1">
                <figure class=" img-hover-scale overflow-hidden">
                    <a href="#" style="width: 100%;">
                        <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                            <h4 class="animated">Fri</h4>
                            <h2 class="animated fw-900">22</h2>
                            <h4 class="animated">Dec</h4>
                        </div>
                    </a>
                </figure>
            </div>
            
        </section>
        <div class="table-responsive slider">
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
        </div>

    </main>
    <footer class="main">
    
        <div class="container pb-20 pt-10 wow fadeIn animated">
            <div class="row">
                <div class="col-12 mb-20">
                    <div class="footer-bottom"></div>
                </div>
                <div class="col-lg-6">
                    <p class="float-md-left font-sm text-muted mb-0">&copy; 2022, <strong class="text-brand">Evara</strong> - HTML Ecommerce Template </p>
                </div>
                <div class="col-lg-6">
                    <p class="text-lg-end text-start font-sm text-muted mb-0">
                        Designed by <a href="http://alithemes.com" target="_blank">Alithemes.com</a>. All rights reserved
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <!-- Preloader Start -->
    <!-- <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="text-center">
                    <h5 class="mb-10">Now Loading</h5>
                    <div class="loader">
                        <div class="bar bar1"></div>
                        <div class="bar bar2"></div>
                        <div class="bar bar3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
    // import "../assets/assets/css/main.css";
    // import "../assets/assets/js/slick/slick.css";
    // import "../assets/assets/js/slick/slick-theme.css";
    // import logo from "../assets/assets/imgs/theme/logo.png";
    // import slider1 from "../assets/assets/imgs/slider/1.png";
    // import slider2 from "../assets/assets/imgs/slider/2.png";
    // import slider3 from "../assets/assets/imgs/slider/3.png";
    // import '../assets/assets/js/vendor/jquery-3.6.0.min.js';
    // import '../assets/assets/js/vendor/jquery-migrate-3.3.0.min.js';
    // import '../assets/assets/js/vendor/bootstrap.bundle.min.js';
    // import '../assets/assets/js/slick/slick.js';
    // import '../assets/assets/js/plugins/jquery.syotimer.min.js';
    // // import '../assets/assets/js/plugins/wow.js';
    // import '../assets/assets/js/plugins/images-loaded.js';
    // import '../assets/assets/js/plugins/isotope.js';
    // import '../assets/assets/js/plugins/scrollup.js';
</script>

<script type="text/javascript">
    $(document).on('ready', function() {

        $(".center").slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        $(".lazy").slick({
            lazyLoad: 'ondemand', // ondemand progressive anticipated
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            autoplaySpeed: 2000,
        });

    });
</script>


<style type="text/css">
    .slider {
        width: 80%;
        margin: 100px auto;
    }

    .slider-img {
        width: 100%;
        margin: 5px auto;
    }

    .slick-slide {
        margin: 0px 7px;
    }

    .slick-slide img {
        width: 100%;
    }

    .slick-prev:before,
    .slick-next:before {
        color: black;
    }


    .slick-slide {
        transition: all ease-in-out .3s;
        opacity: .2;
    }
    
    .slick-active {
        opacity: .5;
    }

    .slick-current {
        opacity: 1;
    }
</style>
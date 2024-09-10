<template>
    <header class="header-area header-style-1 header-height-2">
        <div class="header-top header-top-ptb-1 d-none d-lg-block">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info">
                            <ul>
                                <li><i class="fi-rs-smartphone"></i> <a href="#">+62 838 1130 8999</a></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-4" style="text-align: center;">
                        <div class="logo logo-width-1">
                            <a href="https://www.yogafitid.com/"><img :src="logo" alt="logo"></a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info header-info-right">
                            <ul>
                                <li class="fi-rs-user">  <RouterLink :to="{ name: 'login' }" rel="nofollow">Log In / Sign Up</RouterLink></li>
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
                    <a href="https://www.yogafitid.com/"><img :src="logo" alt="logo"></a>
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
            
            </div>
        </div>
    </div>
    <main class="main">       
        <!-- <section class="lazy slider-img" data-sizes="50vw">
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

                
        </section> -->
    
    
    
        <section class="center slider popular-categories section-padding mt-15">
            <div v-for="(tanggal, indeks) in rentangTanggal" :key="indeks">
                <div :class="{ 'card-1': true, 'selected-card': selectedIndexes === tanggal }">
                    <figure class=" img-hover-scale overflow-hidden">
                        <a href="#" style="width: 100%;"  @click="handleClick(tanggal)">
                            <div class="hero-slider-content-2 align-center" style="margin: 13px;">
                                <h4 :class="{ 'animated': true, 'selected-card1': selectedIndexes === tanggal }">{{ moment(tanggal).format('ddd') }}</h4>
                                <h2 :class="{ 'animated fw-900': true, 'selected-card1': selectedIndexes === tanggal }">{{ moment(tanggal).format('D') }}</h2>
                                <h4 :class="{ 'animated': true, 'selected-card1': selectedIndexes === tanggal }">{{ moment(tanggal).format('MMM') }}</h4>
                            </div>
                        </a>
                    </figure>
                </div>
            </div>
        
            
        </section>
        <h3 class="section-title " style="text-align: center;"><span>Schedule</span> Class</h3>
        <div class="table-responsive slider">
        
            <table class="table table-striped">
                <thead style="background: #f0f1f2;">
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Time</th>
                    <th scope="col">Class</th>
                    <th scope="col">Type</th>
                    <th scope="col">Studio</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading==true">
                        <td colspan="11" class="text-center">
                            <div class="spinner-grow spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="listContract.length==0" >
                        <td colspan="11" class="text-center"> Class Not Found</td>
                    </tr>
                    
                    <tr v-for="(data, index) in listContract" :key="index">
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{ moment(data.tgl_schedule +' '+ data.start_time).format('h.mm A') }} - {{ moment(data.tgl_schedule +' '+ data.end_time).format('h.mm A')}}</td>
                        <td>{{ data.class_name}}</td>
                        <td>
                            <div v-if="data.schedule_type==0">Booking</div>
                            <div v-else>Personal Trainer</div>
                        </td>
                        <td>{{ data.deptname}}</td>
                        <td>{{ data.name}}</td>
                        <td>
                            <button type="button" class="btn btn-dark btn-sm" v-if="data.totalbooking <= data.capacity" @click="booking(data.id_schedule)">Book</button>
                            <button type="button" class="btn btn-dark btn-sm" v-else>Full Booking</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </main>
    <footer class="main">
    
        <section class="section-padding footer-mid">
            <div class="container pt-15 pb-20">
                <div class="row text-center">
                    <div class="col-lg-12 col-md-12">
                        <div class="widget-about font-md mb-md-5 mb-lg-0">
                        
                            <h5 class="mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated">Contact</h5>
                            <p class="wow fadeIn animated">
                                <strong>Address: </strong>PT. Yoga Fit Indonesia
                                        Jl. Sultan Iskandar Muda No. 18C, Kebayoran Lama, Jakarta Selatan, 12240
                            </p>
                            <p class="wow fadeIn animated">
                                <strong>Phone: </strong>+62 838 1130 8999
                            </p>
                            <p class="wow fadeIn animated">
                                <strong>Hours: </strong>10:00 - 22:00
                            </p>
                        
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
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
    import "../assets/assets/js/slick/slick.css";
    import "../assets/assets/js/slick/slick-theme.css";
    import Api from '../api/Api'
    import { ref, onMounted, watch } from 'vue';
    import moment from 'moment'
    import logo from "../assets/assets/imgs/theme/logo.png";
    import slider1 from "../assets/assets/imgs/slider/1.png";
    import slider2 from "../assets/assets/imgs/slider/2.png";
    import slider3 from "../assets/assets/imgs/slider/3.png";
    import '../assets/assets/js/vendor/jquery-3.6.0.min.js';
    import '../assets/assets/js/vendor/jquery-migrate-3.3.0.min.js';
    import '../assets/assets/js/vendor/bootstrap.bundle.min.js';
    import '../assets/assets/js/slick/slick.js';
    import '../assets/assets/js/plugins/jquery.syotimer.min.js';
    // import '../assets/assets/js/plugins/wow.js';
    import '../assets/assets/js/plugins/images-loaded.js';
    import '../assets/assets/js/plugins/isotope.js';
    import '../assets/assets/js/plugins/scrollup.js';
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from "vuex"
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const user = store.getters['auth/currentUser']

    const rentangTanggal = ref([]);
    const indexNow = ref();
    const selectedIndexes=ref(moment().format('YYYY-MM-DD'))
    const listContract=ref({})
    const loading=ref("")

    onMounted(() => {
    
        generateRentangTanggal(rentangTanggal);
        const token = localStorage.getItem("token_yogafit");
        loading.value=true
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        Api.get("/auth/get_users_schedule?id=" + moment().format('YYYY-MM-DD'))
            .then((response) => {
                listContract.value = response.data.data;
                loading.value=false
            })
            .catch((error) => {
            console.log(error);
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    });

    const handleClick = (id) => {
        selectedIndexes.value = id
        const token = localStorage.getItem("token_yogafit");
        loading.value=true
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        Api.get("/auth/get_users_schedule?id=" + id)
            .then((response) => {
                listContract.value = response.data.data;
                loading.value=false
            })
            .catch((error) => {
            console.log(error);
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    }

    const booking = (id) => {
        let token = store.getters['auth/isLoggedIn']
        if (!token) {
            alert('login')
        }else{
        
            alert('Tidak')
        }
    }

    const generateRentangTanggal = (rentang) => {
        const tanggalSekarang = new Date();
        const tanggalAwal = new Date(tanggalSekarang);
        tanggalAwal.setDate(1); // Set ke hari pertama bulan ini

        const tanggalAkhir = new Date(tanggalSekarang);
        tanggalAkhir.setMonth(tanggalAkhir.getMonth() + 2);
        tanggalAkhir.setDate(0); // Set ke hari terakhir bulan dua bulan ke depan

        const arrayTanggal = [];

        // Menghasilkan semua tanggal dalam rentang
        while (tanggalAwal <= tanggalAkhir) {
            arrayTanggal.push(tanggalAwal.toISOString().split('T')[0]);
            tanggalAwal.setDate(tanggalAwal.getDate() + 1);
        }

        const currentDateIndex = arrayTanggal.findIndex((date) => {
            const currentDate = new Date();
            return moment(date).isSame(currentDate, 'day');
        });

        rentang.value = arrayTanggal;
        indexNow.value = currentDateIndex
    };


    
</script>

<script type="text/javascript">
    $(document).on('ready', function() {
        const rentangTanggal = [];
        let indexNow;



    function generateRentangTanggal(rentang) {
    const tanggalSekarang = new Date();
    const tanggalAwal = new Date(tanggalSekarang);
    tanggalAwal.setDate(1); // Set ke hari pertama bulan ini

    const tanggalAkhir = new Date(tanggalSekarang);
    tanggalAkhir.setMonth(tanggalAkhir.getMonth() + 2);
    tanggalAkhir.setDate(0); // Set ke hari terakhir bulan dua bulan ke depan

    const arrayTanggal = [];

    // Menghasilkan semua tanggal dalam rentang
    while (tanggalAwal <= tanggalAkhir) {
        arrayTanggal.push(tanggalAwal.toISOString().split('T')[0]);
        tanggalAwal.setDate(tanggalAwal.getDate() + 1);
    }

    const currentDateIndex = arrayTanggal.findIndex((date) => {
        const currentDate = new Date();
        return moment(date).isSame(currentDate, 'day');
    });

    rentang.push(...arrayTanggal);
    indexNow = currentDateIndex;
    }

    // Example of usage
    generateRentangTanggal(rentangTanggal);
    // console.log(rentangTanggal);
    // console.log(indexNow);


        $(".center").slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 7,
            initialSlide: indexNow,
            slidesToScroll: 1,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
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



<style scoped type="text/css">
    body {
        background: #fff;
    }
</style>
<style type="text/css">


    .selected-date {
    background-color: #000; /* Ganti dengan warna yang diinginkan untuk tanggal sekarang */
    color: #fff; /* Ganti dengan warna teks yang sesuai */
    }
    .slider {
        width: 70%;
        margin: 20px auto;
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
        opacity: 1;
    }

    .slick-current {
        opacity: 1;
    }

    .bg-black {
    background-color: black;
    /* Add any other styles for the black background */
    }.selected-card {
        background: black; /* Set your selected background color */
    }

    .selected-card1 {
        color: white; /* Set your selected background color */
    }

    

/*COMPONENTS -> CARD*/
.card-1 {
  position: relative;
  background: #fff;
  text-align: center;
  border: 1px solid #cce7d0;
  border-radius: 20px;
}

.card-1 figure {
  overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.card-1 figure img {
  border-radius: 10px;
}

.card-1 h5 {
  margin: 20px 0;
}

.card-1 h5 a {
  color: #4f5d77;
}

.card-1:hover a {
  color: #000000;
}

.hero-card {
  width: 100%;
  position: relative;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.hero-card:hover {
  border: 1px solid #000000;
}

.hero-card .hero-card-icon {
  width: 65px;
  height: 65px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 5px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.hero-card .hero-card-icon.icon-left {
  width: 135px;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: start;
}

.hero-card .hero-card-icon.icon-left-2 {
  width: 265px;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: start;
}

.hero-card .hero-card-icon i {
  font-size: 25px;
  color: #6143f7;
}

.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e2e9e1;
  border-radius: .25rem;
}

.card .card-header {
  padding: 1rem;
  margin-bottom: 0;
  background-color: #f7f8f9;
  border-bottom: 1px solid #e2e9e1;
}

.border-radius {
  border-radius: 4px;
}
</style>
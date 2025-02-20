import { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { getProductByBrowseCategory } from "../../Redux/CartSlice";

import "./Categories.css";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";


interface CategoryType {
    id: number;
    title: string;
    icon: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<CategoryType[]>("Assets/browseCategory.json");
                console.log("browseCategory fetched:", response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching browseCategory:", error);
            }
        };
        fetchCategories();
    }, []);

    const swiperRef = useRef<any>(null);

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.swiper.slidePrev();
    };

    const isLogin = useAppSelector((state) => state.user.IsLogin)
    const dispatch = useAppDispatch();

    return (
        <section id="Categories">
            <Container>
                <span className="cats">Categories</span>
                <div className="left-side d-flex justify-content-between flex-wrap mt-4">
                    <h1>Browse By Category</h1>
                    <div className="swiper-nav-buttons">
                        <button onClick={handlePrev} className="swiper-button prev">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext} className="swiper-button next">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <Swiper
                    className="position-relative"
                    ref={swiperRef}
                    modules={[Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 5 },
                        768: { slidesPerView: 3, spaceBetween: 10 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1440: { slidesPerView: 6, spaceBetween: 30 },
                    }}
                    spaceBetween={40}
                    slidesPerView={6}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            {
                                isLogin ?
                                    <Link
                                        onClick={() => dispatch(getProductByBrowseCategory(category.title))}
                                        to={`/BcategoryProducts/${category.title}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="cat-ctn">
                                            <i className={category.icon}></i>
                                            <p>{category.title}</p>
                                        </div>
                                    </Link> :
                                    <Link to="/SignUp" style={{ textDecoration: "none" }}>
                                        <div className="cat-ctn">
                                            <i className={category.icon}></i>
                                            <p>{category.title}</p>
                                        </div>
                                    </Link>
                            }

                        </SwiperSlide>
                    ))}
                </Swiper>
                <hr style={{ color: "gray", marginTop: "4rem" }} />
            </Container>
        </section>
    );
};

export default Categories;

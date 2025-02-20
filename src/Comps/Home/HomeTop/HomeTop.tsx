import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useAppSelector , useAppDispatch } from "../../Redux/Store";
import { getProductByCategory } from "../../Redux/CartSlice";

import 'swiper/swiper-bundle.css';

import "./HomeTop.css";

// Define types for categories and carousel items
interface Category {
  id: number;
  catTitle: string;
}

interface CarouselItem {
  id: number;
  carImage: string;
  TitleImage: string;
  carTitle: string;
  carContent: string;
}

const HomeTop = () => {
  // fetch categories
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get<Category[]>("Assets/categorie.json");
        console.log("categories fetched:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCats();
  }, []);

  // fetch carousel
  const [carousel, setCarousel] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await axios.get<CarouselItem[]>("Assets/carousel.json");
        console.log("carousel fetched:", response.data);
        setCarousel(response.data);
      } catch (error) {
        console.error("Error fetching carousel:", error);
      }
    };
    fetchCarousel();
  }, []);
  const dispatch = useAppDispatch()

  const IsLogin = useAppSelector((state) => state.user.IsLogin);

  return (
    <section id="HomeTop">
      <Container>
        <Row>
          <Col lg={3} md={3} sm={12}>
            <nav>
              <ul>
                {IsLogin ? (
                  categories.map((category) => (
                    <li className="Cats__list text-dark" key={category.id}>
                      <Link
                        onClick={() => dispatch( getProductByCategory(category.catTitle))}
                        to={`/CategoryProducts/${category.catTitle}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {category.catTitle}
                      </Link>
                    </li>
                  ))
                ) : (
                  categories.map((category) => (
                    <li className="Cats__list text-dark" key={category.id}>
                      <Link
                        to={`/SignUp`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {category.catTitle}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </nav>
          </Col>

          <Col lg={9} md={9} sm={12}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
            >
              {carousel.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <img
                    className="slide-img"
                    src={slide.carImage}
                    alt={slide.carTitle}
                  />
                  <div className="silde-content">
                    <div className="top d-flex">
                      <img src={slide.TitleImage} alt={slide.TitleImage} />
                      <p className="title">{slide.carTitle}</p>
                    </div>
                    <h1>{slide.carContent}</h1>
                    <div className="bottom d-flex">
                      <button>Shop Now</button>
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeTop;

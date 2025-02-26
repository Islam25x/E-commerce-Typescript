import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/swiper-bundle.css";
import "./WorkedBy.css";

interface Worker {
  id: string;
  name: string;
  work: string;
  image?: string;
}

const WorkedBy: React.FC = () => {
  const { t } = useTranslation(); // استدعاء الترجمة
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get<Worker[]>("Assets/workedBy.json");
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching Workers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  if (loading) {
    return (
      <section id="WorkedBy">
        <Container>
          <div>{t("Loading...")}</div>
        </Container>
      </section>
    );
  }

  return (
    <section id="WorkedBy">
      <Container>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
            1440: { slidesPerView: 3, spaceBetween: 40 },
          }}
          pagination={{ clickable: true }}
        >
          {workers.map((worker) => (
            <SwiperSlide key={worker.id}>
              <div className="worker-card">
                <div className="top">
                  <img
                    src={worker.image || "/default-worker.jpg"} 
                    alt={worker.name || t("Worker")}
                  />
                </div>
                <div className="bottom my-4">
                  <h4>{t(worker.name)}</h4>
                  <p>{t(worker.work)}</p>
                  <div className="icons d-flex">
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default WorkedBy;

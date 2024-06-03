import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "../../data/testimonial";
import "swiper/css";
const Testimonial = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      pagination={{ clickable: true }}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <article className="testimonial swiper-slide">
            <div className="avatar">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial_info">
              <h5>{testimonial.name}</h5>
              <small>{testimonial.role}</small>
            </div>
            <div className="testimonial_body">
              <p>{testimonial.feedback}</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Testimonial;

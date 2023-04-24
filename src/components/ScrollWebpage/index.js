/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.scss";
import soHyun1 from "./soHyun1.png";
import soHyun2 from "./soHyun2.png";
import soHyun3 from "./soHyun3.png";
import AOS from "aos";
import "aos/dist/aos.css";

const ScrollWebpage = () => {
  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="wrap-scroll">
      <header className="main-header">
        <h1>
          <span>The Body in Art</span>
        </h1>
        <p>
          Sometimes, Loneliness is very dangerous. It's addicting. Once you feel
          how peaceful it is, you don't wanna deal with people @@!...
        </p>
      </header>

      <main className="container">
        <section
          className="card"
          data-aos="fade-right"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun1} alt="soHyun1" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
        <section
          className="card"
          data-aos="fade-left"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun2} alt="" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
        <section
          className="card"
          data-aos="fade-right"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun3} alt="" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
        <section
          className="card"
          data-aos="fade-left"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun1} alt="soHyun1" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
        <section
          className="card"
          data-aos="fade-right"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun2} alt="" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
        <section
          className="card"
          data-aos="fade-left"
          data-aos-offset={300}
          data-aos-easing="ease-in-sine"
        >
          <img src={soHyun3} alt="" />
          <div>
            <h3>The Body in Art</h3>
            <p>
              Sometimes, Loneliness is very dangerous. It's addicting. Once you
              feel how peaceful it is, you don't wanna deal with people @@!...
            </p>
            <a href="#" className="btn">
              Buy now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScrollWebpage;

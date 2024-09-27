import "./App.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { useRef } from "react";
import heroImage from "./assets/tianshu-liu-aqZ3UAjs_M4-unsplash.jpg";

gsap.registerPlugin(useGSAP, Flip);

function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },
  });

  const timel = gsap.timeline({
    delay: 0.5,
    defaults: {
      ease: "power3.out",
      duration: 1.7,
      yPercent: 0,
      y: 0,
    },
  });

  useGSAP(
    () => {
      gsap.set(".preloader", { opacity: 1 });
      gsap.set(
        [
          ".preloader__text span",
          ".hero__title span span",
          ".hero__caption span",
        ],
        {
          yPercent: 100,
        }
      );
      gsap.set(".header *", { y: 24, autoAlpha: 0 });
      gsap.set(".hero__button", { y: 64, autoAlpha: 0 });
      tl.to(".preloader__text span", {
        yPercent: -10,
        delay: 0.3,
      })
        .to(".preloader__text span", {
          yPercent: -105,
          delay: 1,
        })
        .to(".preloader__background", {
          yPercent: -100,
          duration: 1.5,
          ease: "power4.inOut",
        });
      tl.from(
        ".hero__image",
        {
          scale: 1.5,
        },
        "3"
      )
        .to(
          ".hero__wrapper",
          {
            borderRadius: "16px",
          },
          "<"
        )
        .add(() => {
          if (heroWrapperRef.current) {
            const state = Flip.getState(heroWrapperRef.current);
            Flip.from(state, {
              duration: 2,
              ease: "power3.out",
            });
          }
        }, "<");
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      timel
        .to(
          ".hero__caption span",
          {
            duration: 1.2,
            ease: "power3.inOut",
          },
          "2"
        )
        .to(
          ".hero__title span span",
          {
            stagger: 0.2,
          },
          "-=.9"
        )
        .to(
          ".hero__button",
          {
            autoAlpha: 1,
          },
          "2.8"
        );
    },
    { scope: heroWrapperRef }
  );

  useGSAP(
    () => {
      timel.to(
        ".header *",
        {
          autoAlpha: 1,
        },
        "2.8"
      );
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef}>
      <div className="hero-image-start"></div>
      <div className="preloader">
        <p className="preloader__text">
          <span>Say hello to my website</span>
        </p>
        <div className="preloader__background"></div>
      </div>
      <header className="header">
        <p className="header__menu">Menu</p>
        <p className="header__logo">N3</p>
        <button className="button">Order</button>
      </header>
      <div className="hero__wrapper" ref={heroWrapperRef}>
        <section className="hero">
          <div className="hero__image">
            <img src={heroImage} alt="N3 Bike" />
          </div>
          <div className="hero__content">
            <p className="hero__caption">
              <span>More details. More fun.</span>
            </p>
            <h1 className="hero__title">
              <span>
                <span>A new way to </span>
              </span>
              <span>
                <span>ride in style.</span>
              </span>
            </h1>
            <button
              id="hero__button"
              className="hero__button button button--white"
            >
              Explore
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;

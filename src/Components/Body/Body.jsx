/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import styles from "./Body.module.css";
import SearchTemplate from "../SearchTemplate/SearchTemplate";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import dadosVeiculo from "../../data/contents.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchField from "../SearchField/SearchField";

function Body() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(dadosVeiculo);
  const [slider, setSlider] = useState(null);

  const slidesToShow = window.innerWidth > 1010 ? 3 : 1;

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow,
    slidesToScroll: 1,
  };

  const goToNext = () => {
    slider && slider.slickNext();
  };

  const goToPrev = () => {
    slider && slider.slickPrev();
  };

  const handleCarouselImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleSearch = () => {
    const filtered = dadosVeiculo.filter((item) => {
      const byCategory = filter === "All" || item.category === filter;
      const bySearch = item.location
        .toLowerCase()
        .includes(search.toLowerCase());

      return byCategory && bySearch;
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearchChange = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [filter]);

  return (
    <main className={styles.body}>
      <SearchTemplate
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <div className={styles.carouselContainer}>
        <div className={styles.carouselContainerTitle}>
          <h2>Categorias</h2>
        </div>
        <Slider
          ref={(s) => setSlider(s)}
          {...settings}
          className={styles.carousel}
        >
          <div className={styles.carouselItem}>
            <img
              className={styles.imgCarousel}
              src="https://images.pexels.com/photos/4512259/pexels-photo-4512259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Imagem do carro"
            />
            <div className={styles.carouselText}>
              <h3 className={styles.carouselTitle}>Coupé</h3>
            </div>
          </div>
          <div className={styles.carouselItem}>
            <img
              className={styles.imgCarousel}
              src="https://images.pexels.com/photos/6649925/pexels-photo-6649925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Imagem do carro"
            />
            <div className={styles.carouselText}>
              <h3 className={styles.carouselTitle}>HATCH</h3>
            </div>
          </div>
          <div className={styles.carouselItem}>
            <img
              className={styles.imgCarousel}
              src="https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Imagem do carro"
            />
            <div className={styles.carouselText}>
              <h3 className={styles.carouselTitle}>Importado</h3>
            </div>
          </div>
          <div className={styles.carouselItem}>
            <img
              className={styles.imgCarousel}
              src="https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Imagem do carro"
            />
            <div className={styles.carouselText}>
              <h3 className={styles.carouselTitle}>SEDAN</h3>
            </div>
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
          <button onClick={goToPrev} className={styles.btnCarousel}>
            <FaAngleLeft
              style={{ fontSize: "2em", color: "#F0572D", cursor: "pointer" }}
            />
          </button>
          <button onClick={goToNext} className={styles.btnCarousel}>
            <FaAngleRight
              style={{ fontSize: "2em", color: "#F0572D", cursor: "pointer" }}
            />
          </button>
        </div>
      </div>

      <SearchField filter={filter} setFilter={setFilter} />

      <div className={styles.cardCars}>
        <div className={styles.cardForTitle}></div>

        {filteredData.map((item) => (
          <section key={item.id} className={styles.sectionCard}>
            <div className={styles.cardContainer}>
              <img className={styles.imgCar} src={item.img} />
            </div>
            <p className={styles.modelCar}> {item.title} </p>
            <div className={styles.yearCar}>
              <span className={styles.span}>Ano 2020/2021</span>
              <Link to={`/detail/${item.id}`}>
                <button className={styles.buttonCar}>Ver mais</button>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Body;

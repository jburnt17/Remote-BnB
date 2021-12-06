import React from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import SmallCard from "../SmallCard";
import "./styles.css";
import areas from "../../data/areas";

function Home() {
  return (
    <div>
      <NavBar />
      <Banner />
      <main className="main-body">
        <section className="explore-con">
          <h2 className="explore-text">Explore Areas</h2>
          <div className="explore-area">
            {areas.map(({ img, location }) => (
              <SmallCard img={img} location={location} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

import React from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import SmallCard from "../SmallCard";
import areas from "../../data/areas";
import "./Home.css";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <div>
      <NavBar />
      <Banner />
      <main className="main-body">
        <section className="explore-con">
          <h2 className="explore-text">Explore Areas</h2>
          <div className="explore-area">
            {areas.map(({ img, location }, i) => (
              <SmallCard key={i} img={img} location={location} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

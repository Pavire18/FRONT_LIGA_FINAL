import Header from "../../components/Header/Header";
import "./HomePage.scss";
import image from "../../assets/imageA.png";
import Clasification from "../../components/Clasification/Clasification";
import MatchDay from "../../components/MatchDay/MatchDay";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Header></Header>
      <div className="home-page">
        <img className="home-page__image" src={image} />
        <div className="home-page__data">
          <Clasification></Clasification>
          <MatchDay></MatchDay>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

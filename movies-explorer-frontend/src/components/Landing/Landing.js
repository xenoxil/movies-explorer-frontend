import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Landing(props) {
  return (
    <div className="App">
      <Header loggedInState={props.loggedInState} />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs id="techs" />
      <AboutMe id="student" onSize={props.onSize} />
      <Footer />
    </div>
  );
}

export default Landing;

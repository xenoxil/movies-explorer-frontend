import Header from '../Header/Header';
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


function Landing() {
    return (
      <div className="App">
        <Header/>
        <Promo/>
        <NavTab/>   
        <AboutProject />
        <Techs id='techs'/>
        <AboutMe id='student'/>
        <Footer/>   
      </div>
    );
  }
  
  export default Landing;
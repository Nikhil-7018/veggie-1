import Navbar from "./navbar";
import FirstBody from "./Hero";
import SecondBody from "./About";
import Products from "./products";
import Footer from "./footer";
import '../index.css';
const Dashboard = () => {
    return (
      <>
   <Navbar />
   <FirstBody />
   <SecondBody />
   <Products />
   <Footer />
      </>
    )
  };
  
  export default Dashboard;
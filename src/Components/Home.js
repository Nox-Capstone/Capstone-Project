import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Home = (props) => {
  const {products} = props
  const dispArr = [];
  for(let i =0;i<products.length;i=i+3){
    dispArr.push(products[i])
    if(dispArr.length>9){
      break;
    }
  }
  return (
    <form>
      <div>
        <Carousel autoPlay infiniteLoop>
          {dispArr.map((featured)=>(
            <div className='dispImg' key={featured.id}>
              <img src ={featured.image}/>
            </div>
          ))}
        </Carousel>
      </div>
    </form>
  );
};

export default Home;

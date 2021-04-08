import React from 'react';
import './news.scss';
import OwlCarousel from "react-owl-carousel";

const options = {
  margin: 24,
  nav: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,

    }
  },
};

const articles = [
  {
    title: 'CNBC',
    description: `Essential workers on the frontlines of the coronavirus crisis`,
    image: 'https://image.cnbcfm.com/api/v1/image/106485187-1586697420484gettyimages-1218289286.jpeg?v=1586697482&w=740&h=416',
    link: 'https://www.cnbc.com/2020/04/14/photos-essential-workers-on-the-frontlines-of-the-coronavirus-crisis.html',
    author: 'Adam Jeffery',
    date: '14 April 2020',
  },
  {
    title: 'Los Angeles Times',
    description: `How to protect workers from the coronavirus: This CEO has good advice`,
    image: 'https://ca-times.brightspotcdn.com/dims4/default/fa5a945/2147483647/strip/true/crop/4752x3168+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F59%2F01%2F60393aba455dbf9102b1a2d131e8%2Ffi-coronavirus-manfacturer-safety-1.jpg',
    link: 'https://www.latimes.com/business/story/2020-03-26/coronavirus-manufacturer-safety',
    author: 'Russ Mitchell',
    date: '26 March 2020',
  },
  {
    title: 'abc News',
    description: `What companies are doing to protect vulnerable hourly workers amid coronavirus outbreak`,
    image: 'https://s.abcnews.com/images/Business/coronavirus-01-costco-ss-jc-200313_hpEmbed_3x2_992.jpg',
    link: 'https://abcnews.go.com/Business/companies-protect-vulnerable-hourly-workers-amid-coronavirus-outbreak/story?id=69555759',
    author: 'Kelly McCarthy & Catherine Thorbecke',
    date: '13 March 2020',
  },
  {
    title: 'MSN',
    description: `Four used masks, a homemade face shield, and an updated will: A Boston emergency medicine doctor heads to hospital thick with dread`,
    image: 'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/BgT3tuZo9ISwTeGSACsftPGURVY=/1440x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/2MHJN2E7HFB45CSAIXNTI3PJQE.JPG',
    link: 'https://www.bostonglobe.com/2020/04/01/nation/four-used-masks-homemade-face-shield-an-updated-will-boston-emergency-medicine-doctor-heads-hospital-thick-with-dread/',
    author: 'Arthur Glen',
    date: '2 April 2020',
  },
  {
    title: 'New York Times',
    description: `'Health Care Kamikazes': How Spain's Workers Are Battling Coronavirus, Unprotected`,
    image: 'data:image/jpeg;base64,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',
    link: 'https://www.nytimes.com/video/world/europe/100000007051789/coronavirus-ppe-shortage-health-care-workers.html',
    author: 'Sydney Ferguson',
    date: '1 April 2020',
  },
  {
    title: 'Forbes',
    description: `France Struggles As It Wages "War" Against Covid-19`,
    image: 'https://specials-images.forbesimg.com/imageserve/1207384868/960x0.jpg?fit=scale',
    link: 'https://www.forbes.com/sites/joshuacohen/2020/04/01/france-struggles-as-it-wages-war-against-covid-19/#9b094fc11ed9',
    author: 'Tyler Morrison',
    date: '2 April 2020',
  },
];

const News = () => {
  return (
    <div className="news--wrapper px-md-0 px-4">
      <OwlCarousel className="owl-theme" {...options}>
        {
          articles.map(a => <div className="item">
            <div className="news" onClick={() => window.open(a.link, "_blank")}>
              <img src={a.image} alt="" className="news--img img-fluid" />
              <div className="news--desc text-white d-flex flex-column justify-content-end">
                <span className="news--tag">{a.title}</span>
                <p className="news--title mb-0">
                  {a.description}
                </p>
              </div>
              <div className="overlay"></div>
            </div>
            <span className="news--meta d-block mt-2">{`By: ${a.author} `}
              <span className="news--separator">|</span>{` ${a.date}`}</span>
          </div>)
        }
      </OwlCarousel>
    </div>
  )
};

export default News;

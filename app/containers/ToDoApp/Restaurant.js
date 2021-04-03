import React from 'react';

export default function Restaurant(props) {
  const { searchedbrands, brands, prop } = props;
  const images = [
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/images135ea53.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/indexee3e8a8.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/garlic-noodles-61-700x6802c7f765.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/Hakka-Noodles-2-34755e38.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/1200px-Mama_instant_noodle_block625f483.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/20190530-ramen-noodles-vicky-wasik-76-1500x11257be7d5b.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/200702_Hand-Pulled-Noodles_55099856b5.jpeg',
  ];
  const brandsData = (searchedbrands.length > 0
    ? searchedbrands
    : brands || []
  ).map((data, id) => {
    const image = images[Math.floor(Math.random() * images.length)];
    return (
      <div
        className="card"
        onClick={() => {
          prop.history.push({
            pathname: `/restaurant_detail/${id}`,
            state: { index: id, img: image, data: data },
          });
        }}
      >
        <img src={image} alt="Avatar" style={{ width: '100%' }} />
        <div className="container">
          <h4>
            <b>{data.Brand}</b>
          </h4>
          <p>{data.Variety}</p>
          <p>{data.Style}</p>
          <p>{data.Country}</p>
          <p>{data.Stars}</p>
          <p>{data['Top Ten']}</p>
        </div>
      </div>
    );
  });

  return <div className="grid-container">{brandsData}</div>;
}

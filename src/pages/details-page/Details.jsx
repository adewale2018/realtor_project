import 'swiper/css/bundle';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { doc, getDoc } from 'firebase/firestore';

import { FaShare } from 'react-icons/fa';
import { Spinner } from '../../components';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { categoryId, listingId: id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      setLoading(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log('LISTING...', listing);
      }
    };

    fetchListing();
  }, [id]);

  const handleLinkCopied = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => {
      setShareCopied(false);
    }, 2000);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect='fade'
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className='relative w-full overflow-hidden h-[300px]'
              style={{
                background: `url(${listing?.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={handleLinkCopied}
        className='fixed top-[13%] z-10 right-[3%] bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'
      >
        <FaShare className='text-lg text-slate-500' />
      </div>
      {shareCopied && (
        <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-1'>
          Link Copied
        </p>
      )}
    </main>
  );
};

export default Details;

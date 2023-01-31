import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { MdLocationOn } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

const ListItem = ({ id, list, onEdit, onDelete }) => {
  return (
    <li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${list.type}/${id}`}>
        <img
          className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
          src={list?.imgUrls?.[0]}
          loading='lazy'
          alt={list.type}
        />
        <Moment
          className='absolute top-2 left-2 bg-[#3377cc] text-white text-sm uppercase font-semibold rounded-md px-2 py-1 shadow-lg'
          fromNow
        >
          {list?.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px] '>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 text-green-600' />
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>
              {list.address}
            </p>
          </div>
          <p className='font-semibold text-xl m-0  truncate'>{list.name}</p>
          <p className='text-[#457b9d] mt-2 font-semibold'>
            $
            {list.offer
              ? list.discountPrice?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : list.regularPrice?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {list.type === 'rent' && '/ month'}
          </p>
          <div className='flex items-center mt-[10px] space-x-3'>
            <div className='flex items-center mt-[10px] space-x-1'>
              <p className='font-bold text-xs'>
                {list.bedrooms > 1
                  ? `${list.bedrooms} Beds`
                  : `${list.bedrooms} Bed`}
              </p>
            </div>
            <div className='flex items-center mt-[10px] space-x-1'>
              <p className='font-bold text-xs'>
                {list.bathrooms > 1
                  ? `${list.bathrooms} Baths`
                  : `${list.bathrooms} Bath`}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <AiFillDelete
          className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
          onClick={() => onDelete(id)}
        />
      )}
      {onEdit && (
        <FiEdit
          className='absolute bottom-2 right-7 h-4 cursor-pointer text-green-500'
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
};

export default ListItem;

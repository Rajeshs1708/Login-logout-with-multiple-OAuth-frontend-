import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
    return (
        <div className='card col-sm-12 col-md-6 col-lg-4  text-center'>
            <Link to={`/post/${post.id}`} className='link' >
                <span className='title h4'>{post.title}</span>
                <img className='img' alt={post.alt} src={post.img} />
                <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.desc}</p>
                <button className='cardButton'>Read More</button>
            </Link>
        </div>
    )
}

export default Card

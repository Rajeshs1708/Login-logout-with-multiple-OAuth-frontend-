import React,{useState} from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { Heart } from "react-bootstrap-icons";


const Card = ({ post }) => {
    const [color, setColor] = useState(false)

    return (
        <div className='card col-sm-12 col-md-6 col-lg-4'>
            <span className='title   text-center h4'>{post.title}</span>
            <img className='img' alt={post.alt} src={post.img} />
            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.desc}</p>
            <div className='favourite'>
                <Link to={`/post/${post.id}`} className='link' ><button className='cardButton'>Read More</button></Link>
                <Heart style={{color:`${color?"#E75480":""}`}} size={20} onClick={()=>{setColor(color=>!color)}} />
            </div>
        </div>

    )
}

export default Card

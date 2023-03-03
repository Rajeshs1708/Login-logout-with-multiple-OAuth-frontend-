import React,{useState} from 'react';
import './Card.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { HeartFill } from "react-bootstrap-icons";


const Card = ({ post }) => {
    const [color, setColor] = useState(false)

    const handleChange=()=>{
        setColor(color=>!color)
        if(!color){
            const notify = () => toast.success("Added to favourite", {position: "top-center", autoClose: 3000, theme: "colored", });
            notify()
        }else{
            const notify = () => toast.error("Removed to favourite", {position: "top-center", autoClose: 3000, theme: "colored", });
            notify()
        }
    }

    return (
        <div className='card text-center col-sm-12 col-md-6 col-lg-4'>
            <span className='title h4'>{post.title}</span>
            <img className='img img-fluid mx-auto d-block' alt={post.alt} src={post.img} />
            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.desc}</p>
            <div className='favourite'>
                <Link to={`/post/${post.id}`} className='link' ><button className='cardButton'>Read More</button></Link>
                <HeartFill style={{color:`${color?"#E75480":""}`}} size={20} onClick={handleChange} />
                <ToastContainer autoClose={3000} theme="colored" position="top-center" />
            </div>
        </div>

    )
}

export default Card

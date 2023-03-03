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
            const notify = () => toast.success("Added to favourite", { autoClose: 3000, theme: "colored", });
            notify()
        }else{
            const notify = () => toast.success("Removed to favourite", { autoClose: 3000, theme: "colored", });
            notify()
        }
    }

    return (
        <div className='card col-sm-12 col-md-6 col-lg-4'>
            <span className='title   text-center h4'>{post.title}</span>
            <img className='img text-center' alt={post.alt} src={post.img} />
            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.desc}</p>
            <div className='favourite'>
                <Link to={`/post/${post.id}`} className='link' ><button className='cardButton'>Read More</button></Link>
                <HeartFill style={{color:`${color?"#E75480":""}`}} size={20} onClick={handleChange} />
            </div>
        </div>

    )
}

export default Card

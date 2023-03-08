import React, { useState } from 'react'
import './Card.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { HeartFill } from 'react-bootstrap-icons'

const Card = ({ post }) => {
  const [color, setColor] = useState(false)
  const [count, setCount] = useState(0)

  const handleChange = () => {
    setColor(color => !color)
    if (!color) {
      const notify = () =>
        toast.success('Added to favourite', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored'
        })
      notify()
    } else {
      const notify = () =>
        toast.error('Removed to favourite', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored'
        })
      notify()
    }
  }

  return (
    <div className='card text-center col-sm-12 col-md-6 col-lg-4'>
      <span className='title h4'>{post.title}</span>
      <img className='img img-fluid mx-auto' alt={post.alt} src={post.img} />
      <p
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {post.desc}
      </p>
      <Link to={`/post/${post.id}`} className='link'>
        <button className='cardButton'>Read More</button>
      </Link>
      <div className='favourite'>
        <button
          style={{
            color: "grey",
            cursor: 'pointer',
            border:"1px solid lightgray",
            padding:"5px",
            borderRadius:"5px"
            
          }}
          onClick={() => {
            setCount(1)
          }}
        >
          Like {count}
        </button>
        <HeartFill
          style={{
            color: `${color ? '#E75480' : 'grey'}`,
            cursor: 'pointer',
          }}
          size={20}
          onClick={handleChange}
        />
      </div>
      <ToastContainer autoClose={3000} theme='colored' position='top-center' />
    </div>
  )
}

export default Card

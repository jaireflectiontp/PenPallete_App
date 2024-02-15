import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useParams, useNavigate } from 'react-router-dom';
import service from '../appwrite/config'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const { slug } = useParams()
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                setPost(post)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost

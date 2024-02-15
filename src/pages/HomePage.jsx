import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'

const HomePage = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])

    const allPost = posts.map((post) => {
        <div key={post.$id} className='p-2 w-1/4'>
            <Postcard {...post} />
        </div>
    })

    if (posts.length === 0) {
        return <Container classType="flex flex-col items-center justify-start h-screen">
            <h1 className='text-5xl font-bold text-gray-800 dark:text-white'>Loading...</h1>
        </Container>
    }
    return (
        <div className='w-full py-8'>
            {allPost}
        </div>
    )
}

export default HomePage

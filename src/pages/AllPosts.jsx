import React, { useEffect, useState } from 'react'
import { Container, Postcard } from '../components';
import service from '../appwrite/config';
const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const allPost = posts.map((post) => {
        <div key={post.$id} className='p-2 w-1/4'>
            <Postcard post={post} />
        </div>
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {allPost}
                </div>
            </Container>

        </div>
    )
}

export default AllPosts

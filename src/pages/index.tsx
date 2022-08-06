import { withUrqlClient } from 'next-urql'
import Navbar from '../components/Navbar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
    const [{ data }] = usePostsQuery()
    return (
        <>
            <Navbar />
            <div>hello world</div>
            <br />
            {!data ? <div>loading...</div> : data.posts.map(p => <>
                <div key={p.id}>
                    <br />
                    <div>{p.title}</div>
                    <div>{p.createdAt}</div>
                    <div>{p.updatedAt}</div>
                </div></>)}
        </>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)

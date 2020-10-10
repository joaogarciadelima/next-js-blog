import Layout from '../../components/layout'
import { getAllPostsIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post ({ postData }){
    return (
        <Layout>
            <head>
                <title>{postData.title}</title>
            </head>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <br />
            <div className={utilStyles.lightText}>
               <Date dateString={postData.date}/>
            </div>
            <br />
            <div  dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
        )
}

export async function getStaticPaths(){
    const paths = getAllPostsIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }){
    // Add the "await" keyword like this
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"


//FOR GITTALK
/* import Gitalk from 'gatsby-plugin-gitalk';
import '@suziwen/gitalk/dist/gitalk.css' */


//FOR REMARK
/* import Comments from 'remark-ninja-react' */

//FOR COMMENTBOX
/* import commentBox from 'commentbox.io'; */

import Script from "react-inline-script"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  //CONFIG FOR GITTALK
  /* let gitalkConfig = {
    id: post.id,
    title: post.frontmatter.title,
  } */

  // CONFIG FOR REMARK
  /* const siteID = '12dcbf8c-34a0-480f-8ec3-718de293b101';
  const threadSlug = post.frontmatter.title; */

  // CONFIG FOR COMMENTBOX
  /* useEffect(() =>{
    commentBox('5632596591509504-proj')
  }) */

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      {/* //FOR GITTALK */}
      {/* <Gitalk options={gitalkConfig}/> */}

      {/* //FOR REMARK */}
      {/* <Comments siteId={siteID} threadSlug={threadSlug} /> */}

      {/* //FOR COMMENTSBOX */}
      {/* <div className="commentbox" /> */}

      <div id="graphcomment"></div>
      <Script>
        {`
          window.gc_params = {
              graphcomment_id: 'codewithlinda',
              fixed_header_height: 0,
          };

          (function() {
            var gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
            gc.src = 'https://graphcomment.com/js/integration.js?' + Math.round(Math.random() * 1e8);
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
          })();
        `}
      </Script>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

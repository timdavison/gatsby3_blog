import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TemplatePage = ({ data }) => {
  const post = data.nodeArticle
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <small>
          <em>{Date(post.created)}</em>
        </small>{" "}
        <div
          style={{ maxWidth: `300px`, marginBottom: `1.45rem`, width: `100%` }}
        >
          {" "}
          <GatsbyImage
            image={getImage(post.relationships.field_image.localFile)}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.value.split(" ").splice(0, 50).join(" ") + "...",
          }}
        ></div>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    nodeArticle(id: { eq: $id }) {
      title
      body {
        value
      }
      created
      relationships {
        field_image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 300
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
export default TemplatePage

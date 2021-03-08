import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi Timothy</h1>
    <p>Welcome to your new Gatsby site.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />

    {data.allNodeArticle.edges.map(edge => (
      <>
        <h3>
          <Link to={edge.node.id}>{edge.node.title}</Link>
        </h3>
        <small>
          <em>{Date(edge.node.created)}</em>
        </small>
        <div
          style={{ maxWidth: `300px`, marginBottom: `1.45rem`, width: `100%` }}
        >
          <GatsbyImage
            image={getImage(edge.node.relationships.field_image.localFile)}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              edge.node.body.value.split(" ").splice(0, 50).join(" ") + "...",
          }}
        ></div>
      </>
    ))}
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export const query = graphql`
  query {
    allNodeArticle {
      edges {
        node {
          id
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
    }
  }
`
export default IndexPage

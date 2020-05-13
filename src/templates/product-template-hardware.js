import React from 'react';
// import classNames from 'classnames';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Slideshow from '../components/Slideshow';
// import Button from '../components/Button';
import Specifications from '../components/Specifications';
import SectionList from '../components/SectionList';

import Content, { HTMLContent } from '../components/Content';
import generateHTML from '../utils/generateHTML';

export const HardwarePageTemplate = ({
  featuredimages,
  heading,
  shortDescription,
  highlightSpecifications,
  allSpecifications,
  specificationDescription,
  textAndImages,
  contentComponent,
  content,
}) => {
  const PostContent = contentComponent || Content;
  console.log(textAndImages);

  return (
    <>
      <section className="section has-light-dark-background">
        <div className="container">
          <Slideshow content={featuredimages} />
        </div>
      </section>
      <section
        className="section is-medium  has-dark-background"
        id="product-description"
      >
        <div className="container description">
          <div className="columns">
            <div className="column is-half">
              <h2 className="description--title">{heading}</h2>
            </div>
            <div className="column is-half">
              <p className="description--subtitle">
                <strong>Description</strong>
              </p>
              <p className="description--text">{shortDescription}</p>
            </div>
          </div>
        </div>
      </section>
      <Specifications
        highlighted={highlightSpecifications}
        all={allSpecifications}
      >
        <PostContent
          className="content"
          content={generateHTML(specificationDescription)}
        />
      </Specifications>

      <section
        id="hardware-citation"
        className="section has-dark-background is-medium free-text-centered"
      >
        <div className="container">
          <PostContent content={content} />
        </div>
      </section>
      <SectionList items={textAndImages} />
    </>
  );
};

const HardwarePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    featuredimages,
    heading,
    shortDescription,
    seoDescription,
    specificationDescription,
    highlightSpecifications,
    allSpecifications,
    textAndImages,
  } = frontmatter;

  return (
    <Layout seoDescription={seoDescription} seoTitle={title}>
      <HardwarePageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        featuredimages={featuredimages}
        heading={heading}
        shortDescription={shortDescription}
        seoDescription={seoDescription}
        highlightSpecifications={highlightSpecifications}
        allSpecifications={allSpecifications}
        textAndImages={textAndImages}
        specificationDescription={specificationDescription}
      />
    </Layout>
  );
};

export default HardwarePage;

export const HardwarePageQuery = graphql`
  query HardwarePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        featuredimages {
          alt
          img {
            childImageSharp {
              fluid(maxHeight: 900) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        heading
        shortDescription
        seoDescription
        specificationDescription
        highlightSpecifications {
          heading
          description
        }
        allSpecifications {
          heading
          description
        }
        textAndImages {
          heading
          description
          img {
            childImageSharp {
              fluid(maxHeight: 790) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;

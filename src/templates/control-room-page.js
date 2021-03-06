import React from 'react';
import { graphql } from 'gatsby';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Content, { HTMLContent } from '../components/Content';
import Carousel from '../components/Carousel';
import Title from '../components/Title';
import SEO from '../components/SEO';
import SectionWith3Col from '../components/SectionWith3Col';
import NonStretchedImage from '../components/NonStretchedImage';

const StyledControlroomPage = styled.div`
  section.section#controlroom-hero {
    .column.children-padding {
      padding-right: 20px;

      p {
        @include text_Light;

        padding-bottom: 25px;
      }
    }

    figure.image img {
      margin: auto;
    }
  }

  section.video {
    .content.has-white-background {
      background: $white;
      padding: 30px 15px;

      p {
        font-weight: bold;
      }
    }
    .video-background {
      margin: auto;
      position: relative;
      display: block;
      text-align: center;
    }
    .video-iframe {
      width: 85vw;
      height: 48vw;
      @media screen and (min-width: $desktop) {
        width: 57vw;
        height: 32vw;
      }
    }

    @media (min-aspect-ratio: 16/9) {
      .video-foreground {
        height: 300%;
        top: -200px;
      }
    }
    @media (max-aspect-ratio: 16/9) {
      .video-foreground {
        width: 300%;
        left: -100px;
      }
    }
    @media screen and (min-width: $desktop) {
      .content.has-white-background {
        max-width: 400px;
        position: relative;
        top: -100px;
        left: 0;
        padding: 30px;
        p {
          @include text_Dark;
          font-weight: bold;
        }
      }
    }
  }

  section#features {
    #features-icons {
      text-align: center;
      margin-top: 32px;
      .features-icons-item {
        margin: auto;
        padding: 40px 50px;
        border-right: 1px solid $border-dark-background;
        &:last-of-type {
          border: 1px solid transparent;
        }
        figure.image {
          padding-bottom: 30px;
          img {
            height: 60px;
          }
        }
        h4 {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  section#solution-carousel.section {
    padding-bottom: 6rem;
  }
`;

export const ControlroomPageTemplate = ({
  title,
  content,
  contentComponent,
  heading,
  featuredimage,
  subheading,
  featuredData,
  videoDescription,
  features,
  lightbox,
}) => {
  const PageContent = contentComponent || Content;
  const videoOptions = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      loop: 1,
    },
  };
  return (
    <StyledControlroomPage>
      <SEO title={title} />
      <section
        id="controlroom-hero"
        className="section is-medium has-dark-background"
      >
        <div className="container">
          <div className="columns  reverse-row-order">
            <div className="column children-padding">
              <h1>{heading}</h1>
              <p>{subheading}</p>
              <Button
                text="Kontakt oss"
                link="/kontakt"
                className="is-primary"
              />
            </div>
            <div className="column ">
              <NonStretchedImage
                objectFit="contain"
                alt="Control room"
                className="image"
                {...featuredimage}
              />
            </div>
          </div>
        </div>
      </section>
      <SectionWith3Col
        className="has-dark-background"
        position="left"
        heading={featuredData.heading}
        columns={featuredData.featuredDataBoxes}
      />
      <section id="btgo-page-content" className="section has-dark-background">
        <div className="container centered">
          <PageContent content={content} />
        </div>
      </section>
      <section className="video section has-dark-background">
        <div className="container">
          <div className="video-background">
            <YouTube
              videoId="psagF7LbQ5s"
              opts={videoOptions}
              className="video-iframe"
            />
          </div>
          <div className="content has-white-background">
            <p>{videoDescription}</p>
          </div>
        </div>
      </section>
      <section id="features" className="section has-dark-background">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <Title
                title={features.heading}
                subtitle={features.subheading}
                description={features.description}
                position="left"
              />
            </div>
          </div>
          <div id="features-icons" className="columns">
            {features.featureItems.map(featuredElement => (
              <div className="features-icons-item column is-3">
                <figure className="image">
                  <img src={featuredElement.icon.publicURL} alt="Icon" />
                </figure>
                <h4>{featuredElement.heading}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="solution-carousel" className="section has-dark-background">
        <div className="container">
          <Title
            title={lightbox.heading}
            description={lightbox.description}
            position="center"
          />
          <Carousel items={lightbox.carouselItems} />
        </div>
      </section>
    </StyledControlroomPage>
  );
};

const ControlroomPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ControlroomPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        featuredimage={post.frontmatter.featuredimage}
        subheading={post.frontmatter.subheading}
        content={post.html}
        featuredData={post.frontmatter.featuredData}
        videoDescription={post.frontmatter.videoDescription}
        features={post.frontmatter.features}
        lightbox={post.frontmatter.lightbox}
      />
    </Layout>
  );
};

export default ControlroomPage;

export const ControlroomPageQuery = graphql`
  query ControlroomPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        subheading
        featuredimage {
          childImageSharp {
            fluid(maxHeight: 1920, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        featuredData {
          heading
          featuredDataBoxes {
            icon {
              extension
              publicURL
            }
            heading
            description
            cta
          }
        }
        videoDescription
        features {
          heading
          subheading
          description
          featureItems {
            heading
            icon {
              extension
              publicURL
            }
          }
        }
        lightbox {
          heading
          description
          carouselItems {
            heading
            description
            img {
              childImageSharp {
                fluid(maxHeight: 1180) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;

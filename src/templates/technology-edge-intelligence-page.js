import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import generateHTML from '../utils/generateHTML';
import NonStretchedImage from '../components/NonStretchedImage';
import Button from '../components/Button';
import SplittedSection from '../components/SplittedSection';
import CTASection from '../components/CTASection';
import { ButtonFlex } from '../styles';
import { idMaker } from '../utils/id-maker';

const gen = idMaker();

const StyledEdgeIntelligence = styled.section`
  .quote {
    border-top: 2px solid #27384d;
    border-bottom: 2px solid #27384d;
    color: white;
    font-size: 22px;
    .quote__author {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .examples {
    .container.centered {
      h2 {
        max-width: 845px;
      }
    }
  }
  .buttons {
    padding-top: 0;
  }
  @media only screen and (max-width: 768px) {
    .system-on-chip .image {
      margin-bottom: 0px;
      padding-bottom: 0;
    }
  }
`;

const StyledContent = styled.section`
  margin: auto 0;
  h3 {
    font-weight: 300;
    padding-bottom: 30px;
  }
  &::before {
    content: '';
    display: inline-block;
    position: relative;
    width: 40px;
    height: 78px;
    top: 95px;
    left: -30px;
    opacity: 0.3;
    border-left: 2px solid #7bb7ef;
  }
`;

export const EdgeIntelligenceTemplate = ({
  contentComponent,
  heading,
  subheading,
  featuredimage,
  featuredimageMobile,
  description,
  systemOnChip,
  quote,
  examples,
  thirdSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <StyledEdgeIntelligence className="has-dark-background">
      <section className="section">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--subheading subheading--below">{subheading}</p>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className={classNames('image', {
              'is-hidden-mobile': featuredimageMobile,
            })}
            {...featuredimage}
          />
          {featuredimageMobile ? (
            <NonStretchedImage
              objectFit="contain"
              alt=""
              className={classNames('image', 'is-hidden-tablet')}
              {...featuredimageMobile}
            />
          ) : (
            <></>
          )}
        </div>
      </section>
      {systemOnChip && systemOnChip.featuredimage ? (
        <SplittedSection
          className="section"
          leftColumn={
            <>
              <h2>{systemOnChip.heading}</h2>
              <p className="subheading--below">{systemOnChip.subheading}</p>
              <PostContent
                content={generateHTML(systemOnChip.content)}
                className="content is-left-aligned"
              />
            </>
          }
          rightColumn={
            <NonStretchedImage
              objectFit="contain"
              alt=""
              className="image image--center"
              {...systemOnChip.featuredimage}
            />
          }
        />
      ) : (
        <></>
      )}

      {systemOnChip && systemOnChip.subsections ? (
        systemOnChip.subsections.map((sectionItem, index) => (
          <SplittedSection
            key={gen.next().value}
            className={classNames('system-on-chip', 'section', {
              'has-border-top--mobile': index === 0,
              'has-border-top': index === 0,
            })}
            leftColumnCSS="center-vertically"
            leftColumn={
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image image--center"
                {...sectionItem.featuredimage}
              />
            }
            rightColumnCSS="center-vertically"
            rightColumn={
              <StyledContent>
                <p className="subheading">{sectionItem.subheading}</p>
                <h3>{sectionItem.heading}</h3>
                <PostContent
                  content={generateHTML(sectionItem.content)}
                  className="content is-left-aligned"
                />
                {sectionItem.buttons && sectionItem.buttons.length > 0 ? (
                  <ButtonFlex className="buttons">
                    {sectionItem.buttons.map(buttonObject => {
                      const { text, path } = buttonObject;
                      const isContactButton = path.includes('contact');

                      return (
                        <Button
                          key={gen.next().value}
                          className={classNames({
                            'is-transparent': !isContactButton,
                            'is-primary': isContactButton,
                          })}
                          text={text}
                          path={path}
                        />
                      );
                    })}
                  </ButtonFlex>
                ) : (
                  <></>
                )}
              </StyledContent>
            }
          />
        ))
      ) : (
        <></>
      )}

      {quote ? (
        <section className="section quote zig-zag-background">
          <div className="container centered">
            <PostContent
              content={generateHTML(quote.content)}
              className="content centered-free-text"
            />
            <p className="quote__author">{quote.author}</p>
          </div>
        </section>
      ) : (
        <></>
      )}

      {examples && examples.items && examples.items.length > 0 ? (
        <section className="section is-medium examples">
          <div className="container centered">
            <h2>{examples.heading}</h2>
            <PostContent
              content={generateHTML(examples.content)}
              className="content"
            />
          </div>
          {examples.items.map(sectionItem => (
            <SplittedSection
              key={gen.next().value}
              className="section"
              leftColumnCSS="center-vertically"
              leftColumn={
                <NonStretchedImage
                  objectFit="contain"
                  alt=""
                  className="image"
                  {...sectionItem.featuredimage}
                />
              }
              rightColumnCSS="center-vertically"
              rightColumn={
                <StyledContent>
                  <p className="subheading">{sectionItem.subheading}</p>
                  <h3>{sectionItem.heading}</h3>
                  <PostContent
                    content={generateHTML(sectionItem.content)}
                    className="content is-left-aligned"
                  />
                  {sectionItem.buttons && sectionItem.buttons.length > 0 ? (
                    <ButtonFlex className="buttons">
                      {sectionItem.buttons.map(buttonObject => (
                        <Button
                          key={gen.next().value}
                          className={classNames('is-transparent')}
                          text={buttonObject.text}
                          path={buttonObject.path}
                        />
                      ))}
                    </ButtonFlex>
                  ) : (
                    <></>
                  )}
                </StyledContent>
              }
            />
          ))}
        </section>
      ) : (
        <></>
      )}

      <SplittedSection
        shouldReorderOnMobile
        className="section content has-dark-background has-border-top"
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image image--center"
            {...thirdSection.featuredimage}
          />
        }
        rightColumnCSS="centered"
        leftColumnCSS="center-vertically"
        leftColumn={
          <PostContent
            className="content links-are-buttons"
            content={generateHTML(thirdSection.content)}
          />
        }
      />

      <CTASection
        heading="Want to Collaborate with SEALAB on new Solutions that are using Edge Technology?"
        buttonText="Contact us"
        buttonPath="/contact/"
      />
    </StyledEdgeIntelligence>
  );
};

const EdgeIntelligencePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    subheading,
    description,
    featuredimage,
    featuredimageMobile,
    systemOnChip,
    quote,
    examples,
    thirdSection,
    centeredSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <EdgeIntelligenceTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        subheading={subheading}
        description={description}
        featuredimage={featuredimage}
        featuredimageMobile={featuredimageMobile}
        systemOnChip={systemOnChip}
        quote={quote}
        examples={examples}
        thirdSection={thirdSection}
        centeredSection={centeredSection}
      />
    </Layout>
  );
};

export default EdgeIntelligencePage;

export const pageQuery = graphql`
  query EdgeIntelligencePageSecondaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        subheading
        featuredimage {
          publicURL
          extension
          childImageSharp {
            fluid(maxWidth: 1410, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        featuredimageMobile {
          publicURL
          extension
          childImageSharp {
            fluid(maxWidth: 700, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        systemOnChip {
          heading
          subheading
          content
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          subsections {
            heading
            subheading
            content
            buttons {
              text
              path
            }
            featuredimage {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 600, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
        quote {
          content
          author
        }
        examples {
          heading
          content
          items {
            heading
            subheading
            content
            featuredimage {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 600, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
        thirdSection {
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 405, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          content
        }
      }
    }
  }
`;

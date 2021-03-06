import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const DynamicNavbar = ({ props }) => {
  return (
    <StaticQuery
      query={graphql`
        query NavbarQuery {
          site {
            siteMetadata {
              email
              phone
            }
          }
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/settings/navbar/" } }
          ) {
            edges {
              node {
                frontmatter {
                  menuPaths {
                    title
                    path
                    dropdown {
                      regular {
                        title
                        path
                      }
                      highlighted {
                        title
                        path
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Navbar
          phone={data.site.siteMetadata.phone}
          email={data.site.siteMetadata.email}
          menuPaths={data.allMarkdownRemark.edges[0].node.frontmatter.menuPaths}
          {...props}
        />
      )}
    />
  );
};

DynamicNavbar.propTypes = {
  props: PropTypes.object,
  intl: PropTypes.object,
};

export default DynamicNavbar;

// export { default } from './Navbar';

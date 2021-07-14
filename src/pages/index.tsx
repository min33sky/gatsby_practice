import Template from 'components/Common/Template';
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList';
import Introduction from 'components/Main/Introduction';
import PostList, { PostType } from 'components/Main/PostList';
import { ProfileImageProps } from 'components/Main/ProfileImage';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';
import React, { FC } from 'react';
import { useMemo } from 'react';

interface IProps {
  location: {
    search: string;
  };
  data: {
    allMarkdownRemark: {
      edges: PostType[];
    };

    file: {
      childImageSharp: {
        fluid: ProfileImageProps['profileImage'];
      };
    };
  };
}

// const CATEGORY_LIST = {
//   All: 5,
//   Web: 3,
//   Mobile: 2,
// };

const IndexPage: FC<IProps> = ({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { fluid },
    },
  },
}) => {
  const parsed: ParsedQuery<string> = queryString.parse(search);

  const selectedCategory =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const categoryList = useMemo(() => {
    return edges.reduce(
      (
        list: CategoryListProps['categoryList'],
        {
          node: {
            frontmatter: { categories },
          },
        }: PostType,
      ) => {
        categories.forEach(category => {
          if (list[category] === undefined) list[category] = 1;
          else list[category] += 1;
        });

        list['All'] += 1;

        return list;
      },
      { All: 0 },
    );
  }, []);

  return (
    <Template>
      <Introduction profileImage={fluid} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  );
};

export default IndexPage;

export const queryPostList = graphql`
  query queryPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                fluid(
                  maxWidth: 768
                  maxHeight: 200
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

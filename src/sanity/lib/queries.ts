import { defineQuery } from "next-sanity";

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readMinutes,
    tags,
    featured,
    publishedAt,
    _createdAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      "slug": slug.current,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readMinutes,
    tags,
    featured,
    publishedAt,
    _createdAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      "slug": slug.current,
      image,
      bio
    },
    categories[]->{
      title,
      "slug": slug.current
    },
    body
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

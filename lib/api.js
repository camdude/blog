import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
    title,
    coverImage,
    'author': author->{name, 'avatar': avatar.asset->url},
    date,
    description,
    'slug': slug.current,
`;

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields}}`
  );

  return results;
}

export async function getBlogBySlug(slug) {
  const result = await client
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
        ${blogFields}
        content[]{..., "asset": asset->}
      }`,
      { slug }
    )
    .then((res) => res?.[0]);

  return result;
}

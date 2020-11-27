import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
    title,
    coverImage,
    'author': author->{name, 'avatar': avatar.asset->url},
    date,
    description,
    'tags': tags->name,
    'slug': slug.current,
`;

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs(
  { offset = 0, date = 'desc' } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date ${date}) {${blogFields}}[${offset}...${
      offset + 4
    }]`
  );

  return results;
}

export async function getBlogsByTag(
  { offset = 0, date = 'desc', tag = '' } = { offset: 0, date: "desc", tag: "" }
) {
  const results = await client.fetch(
    `*[_type == "blog" && tags->name == "${tag}"] | order(date ${date}) {${blogFields}}[${offset}...${
      offset + 4
    }]`
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

export async function getAllTags() {
  const results = await client.fetch(
    `*[_type == "tag"] | order(name asc) {name}`
  );
  return results;
}

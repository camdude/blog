import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
    protected,
    title,
    'coverImage': coverImage.asset->,
    'author': author->{name, 'avatar': avatar.asset->url},
    date,
    description,
    'tags': tags->name,
    'slug': slug.current,
`;

const builder = imageUrlBuilder(client);
const getClient = (preview) => (preview ? previewClient : client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields}}`
  );
  return results;
}

export async function getAllBlogsWithContent() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields} content[]{..., "asset": asset->, "image": image.asset->, images[]{..., "image": asset->}}}`
  );

  return results;
}

export async function getPaginatedBlogs(
  { offset = 0, date = "desc" } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == "blog" && protected.isHidden != true] | order(date ${date}) {${blogFields}}[${offset}...${
      offset + 4
    }]`
  );
    console.log(results);
  return results;
}

export async function getPaginatedBlogsByTag(
  { offset = 0, date = "desc", tag = "" } = { offset: 0, date: "desc", tag: "" }
) {
  const results = await client.fetch(
    `*[_type == "blog" && tags->name == "${tag}"] | order(date ${date}) {${blogFields}}[${offset}...${
      offset + 4
    }]`
  );
  return results;
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
        ${blogFields}
        content[]{..., "asset": asset->, "image": image.asset->, images[]{..., "image": asset->}}
      }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

export async function getAllTags() {
  const results = await client.fetch(
    `*[_type == "tag"] | order(name asc) {name}`
  );
  return results;
}

export async function getSupport() {
  const results = await client.fetch(`*[_type == "support"]`);
  return results;
}

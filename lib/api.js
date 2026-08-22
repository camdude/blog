import client, { previewClient } from "./sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

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

// Excludes password-protected/hidden posts and Sanity draft documents.
// Applies to listing queries only — never to getBlogBySlug, which needs both.
const visibleBlogFilter = `_type == "blog" && protected.isHidden != true && !(_id in path("drafts.**"))`;

const builder = createImageUrlBuilder(client)
const getClient = (preview) => (preview ? previewClient : client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[${visibleBlogFilter}] | order(date desc) {${blogFields}}`
  );
  return results;
}

export async function getAllBlogsWithContent() {
  const results = await client.fetch(
    `*[${visibleBlogFilter}] | order(date desc) {${blogFields} content[]{..., "asset": asset->, "image": image.asset->, images[]{..., "image": asset->}}}`
  );

  return results;
}

export async function getPaginatedBlogs(
  { offset = 0, date = "desc" } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[${visibleBlogFilter}] | order(date ${date}) {${blogFields}}[${offset}...${offset + 6
    }]`
  );
  return results;
}

export async function getPaginatedBlogsByTag(
  { offset = 0, date = "desc", tag = "" } = { offset: 0, date: "desc", tag: "" }
) {
  const results = await client.fetch(
    `*[${visibleBlogFilter} && tags->name == $tag] | order(date ${date}) {${blogFields}}[${offset}...${offset + 6
    }]`,
    { tag }
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

export async function addSubscriber(subscriber) {
  const results = await client.create(subscriber)
  return results;
}

// *** Authentication ***
export async function getSubscriberByToken(token) {
  const results = await client.fetch(
    `*[_type == "subscriber" && token == $token][0]{ _id, email }`,
    { token }
  )
  return results;
}

export async function checkProtection(slug) {
  const results = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{ isProtected, "slug": slug.current }`,
    { slug }
  )
  return results;
}

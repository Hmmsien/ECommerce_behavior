// Sanity Client
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '7bwbu6ac',
    dataset: 'production',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN2
})

const builder = imageUrlBuilder(client);

console.log("Token chosen:", process.env.NEXT_PUBLIC_SANITY_TOKEN2)

export const urlFor = (source) => builder.image(source);






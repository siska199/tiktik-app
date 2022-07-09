import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: '2022-03-10',
  useCdn: false,
  //useCdn : process.env.NODE_ENV === "production
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export default client
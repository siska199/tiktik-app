import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId:process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.TOKEN,
  ignoreBrowserTokenWarning: true
});

export default client
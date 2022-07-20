import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId:process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: '2022-03-10',
  token: process.env.TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true
});

export default client
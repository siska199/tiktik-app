export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/mp4, video/webm, video/ogg",
      },
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "postBy",
      title: "PostBy",
      type: "reference",
      to: { type: "user" },
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "user" },
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          name: "comment",
          fields: [
            {
              name: "field",
              title: "Field",
              type: "string",
            },
            {
              name: "postBy",
              tittle: "PostBy",
              type: "reference",
              to :{type:"user"}
            },
          ],
        },
      ],
    },
  ],
};

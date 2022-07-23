export const queryCategories = `
*[_type=="category" ]{
  _id,
  name,
  "icon" : icon{
    "_id": asset->_id,
    "url": asset->url
   }
} | order(_createdAt desc) 
`

export const queryUserById = `
*[_type=="user" && _id==$_idUser ]{
  _id,
  image,
  name,
  username,
  "countFollowers" : count(followers),
} | order(_createdAt desc)  
`

export const queryPosts = `
*[_type=="post"]{
  _id,
  _createdAt,
  caption,
  "bookmark":bookmarks[_ref==$_idUser][0]._key,
  video{
    "url" : asset->url,
    "_id": asset->_id
  },
  "postBy":postBy->{image,name, username},
} | order(_createdAt desc)
`

export const queryPostsByCaption = `
    *[_type=="post" && category->name==$topic]{
      _id,
      _createdAt,
      caption,
      "bookmark":bookmarks[_ref==$_idUser][0]._key,
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "postBy":postBy->{image,name, username},
    } | order(_createdAt desc)  
`

export const queryPostsPostedByUser = `
    *[_type=="post" && postBy._ref==$_idUser]{
      _id,
      _createdAt,
      caption,
      "bookmark":bookmarks[_ref==$_idUser][0]._key,
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "postBy":postBy->{image,name, username},
    } | order(_createdAt desc)  
`

export const queryPostsBookmarkedByUser = `
    *[_type=="post" && $_idUser in bookmarks[]._ref]{
      _id,
      _createdAt,
      caption,
      "bookmark":bookmarks[_ref==$_idUser][0]._key,
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "postBy":postBy->{image,name, username},
    } | order(_createdAt desc)  
`

export const queryPostById = `
    *[_type=="post"&&_id==$_idPost]{
      _id,
      _createdAt,
      caption,
      "category": category->name  ,
      "likes": likes[]._ref,
      "like": likes[_ref==$_idUser][0]._key,
      "countLikes":count(likes),
      "bookmarks":bookmarks[]._ref,
      "bookmark": bookmarks[_ref==$_idUser][0]._key,
      "comments": comments|order(createdAt desc)[]{
          "field" : field,
            "postBy":postBy->{image,name,username},
            "createdAt":postBy->_createdAt
      },
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "postBy":postBy->{image,name, username},
    }[0]
`


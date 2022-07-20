export const queryPosts = `
    *[_type=="post"]{
      _id,
      _createdAt,
      caption,
      "category": category->name  ,
      "likes": likes[]->username,
      "countLikes":count(likes),
      "comments": comments|order(createdAt desc)[]{
          "field" : field,
            "postBy":postBy->{image,name,username},
            "createdAt":postBy->_createdAt
      },
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "like":$username in likes[]->username,
      "postBy":postBy->{image,name, username},
    } | order(_createdAt desc)
`

export const queryPostsByCaption = `
    *[_type=="post" && category->name==$topic]{
      _createdAt,
      _id,
      caption,
      "category": category->name  ,
      "likes": likes[]->username,
      "countLikes":count(likes),
      "comments": comments|order(createdAt desc)[]{
          "field" : field,
            "postBy":postBy->{image,name,username},
            "createdAt":postBy->_createdAt
      },
      video{
        "url" : asset->url,
        "_id": asset->_id
      },      
      "like":$username in likes[]->username,
      "postBy":postBy->{image,name, username},

    } | order(_createdAt desc)  
`

export const queryPostById = `
    *[_type=="post"&&_id==$id]{
      _createdAt,
      _id,
      caption,
      "category": category->name  ,
      "likes":likes[]->username,
      "countLikes":count(likes),
      "comments": comments|order(createdAt desc)[]{
          "field" : field,
            "postBy":postBy->{image,name,username},
            "createdAt":postBy->_createdAt
      },
      video{
        "url" : asset->url,
        "_id": asset->_id
      },
      "like": $username in likes[]->username,
      "postBy":postBy->{image,name, username},
    }[0]
`

export const queryCategories = `
    *[_type=="category"]{
      _id,
      name
    }
`
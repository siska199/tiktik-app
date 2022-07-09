export const queryPosts = `
    *[_type=="post"]{
      _id,
      _createdAt,
      "category": category->name  ,
      "likes": likes[]->username,
      "countLikes":count(likes),
      "comments": comments[]{
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
    } | order(createdAt desc)
`

export const queryPostsByCaption = `
    *[_type=="post" && category->name==$topic]{
      _createdAt,
      _id,
      "category": category->name  ,
      "likes": likes[]->username,
      "countLikes":count(likes),
      "comments": comments[]{
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

    } | order(createdAt)  
`

export const queryPostById = `
    *[_type=="post"&&_id==$id]{
      _createdAt,
      _id,
      "category": category->name  ,
      "likes": likes[]->username,
      "countLikes":count(likes),
      "comments": comments[]{
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


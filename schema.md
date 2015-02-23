users {
  {user_key} : {
    provider
    displayName
    profileUrl
    avatarUrl
  }
}

user_posts {
  {user_key} : {
    {post_key} : {
      title
      timestamp
      embedData
      description
      favoritedBy : {
        {user_key} : {displayName, profileUrl, avatarUrl}
      }
    }
  }
}

favorites {
  post_key {
    user_key: true,
    user_key: ...
  }
}

const list = async () => {
  // Access to DB
  return new Promise((resolve) =>
  {
    // Get DB data
    resolve([
      {id : 1, desc : "Friends channel"},
      {id : 2, desc : "Work channel"},
      {id : 3, desc : "Game channel"}
    ])
  })
}

module.exports = {
  list: list,
  get: async (id) => {
    const data = await list()
    for (let i = 0; i < data.length; i++ )
      if(data[i].id == id)
        return data[i]
    return null
  }
}

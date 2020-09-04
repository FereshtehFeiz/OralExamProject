class User {
  constructor(id, name, email, hash, cid) {
    if (id) this.id = id;

    this.name = name;
    this.email = email;
    this.hash = hash;
    this.cid = cid;
  }
}

module.exports = User;

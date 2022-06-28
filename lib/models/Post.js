const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;


  constructor(row) {
    this.id = row.id;
    this.post = row.post;
  
  }

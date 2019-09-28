class Cube {
  constructor(id, name, description, imageUrl, difficultyLevel) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.difficultyLevel = Number(difficultyLevel);
  }
}

module.exports = Cube;

class BookCollection {
  constructor(shelfGenre, room, shelfCapacity) {
    this.room = room;
    this.shelfGenre = shelfGenre;
    this.shelfCapacity = shelfCapacity;
    this.shelf = [];

    return this;
  }

  get room() {
    return this._room;
  }

  set room(value) {
    if (!['livingRoom', 'bedRoom', 'closet'].includes(value)) {
      throw `Cannot have book shelf in ${value}`;
    }

    this._room = value;
  }

  get shelfCondition() {
    return this.shelfCapacity - this.shelf.length;
  }

  addBook(bookName, bookAuthor, genre) {
    if (this.shelfCapacity <= this.shelf.length) {
      this.shelf.shift();
    }

    let currentBook = { bookName, bookAuthor, genre };
    this.shelf.push(currentBook);
    this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));

    return this;
  }

  throwAwayBook(bookName) {
    this.shelf = this.shelf.filter(v => v.bookName !== bookName);
    this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));

    return this;
  }

  showBooks(genre) {
    let result = `Results for search "${genre}":\n`;

    result += this.shelf
      .filter(v => v.genre === genre)
      .map(v => `\uD83D\uDCD6 ${v.bookAuthor} - "${v.bookName}"`)
      .join('\n');

    return result.trim();
  }

  toString() {
    let result = '';
    if (this.shelf.length === 0) {
      result = "It's an empty shelf";
    } else {
      result += `"${this.shelfGenre}" shelf in ${this.room} contains:\n`;

      result += this.shelf
        .map(v => `\uD83D\uDCD6 "${v.bookName}" - ${v.bookAuthor}`)
        .join('\n');
    }

    return result.trim();
  }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
livingRoom.addBook("Introduction to Programming with C#", "Svetlin Nakov")
livingRoom.addBook("Introduction to Programming with Java", "Svetlin Nakov")
livingRoom.addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.toString());
console.log(livingRoom.shelfCondition);

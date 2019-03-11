class BookCollection {
  constructor(shelfGenre, room, shelfCapacity) {
    // if (!['livingRoom', 'bedRoom', 'closet'].includes(room)) {
    //   throw `Cannot have book shelf in ${room}`;
    // }

    this.room = room;
    this.shelfGenre = shelfGenre;
    this.shelfCapacity = shelfCapacity;
    this.shelf = [];
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

  addBook(bookName, bookAuthor, genre) {
    if (this.shelfCapacity <= this.shelf.length) {
      this.shelf.shift();
    }

    let currentBook = {
      name: bookName,
      author: bookAuthor,
      genre: genre
    };

    this.shelf.push(currentBook);
    this.shelf.sort((a, b) => a.author.localeCompare(b.author));
  }

  throwAwayBook(bookName) {
    this.shelf = this.shelf.filter(v => v.name !== bookName);
  }

  showBooks(genre) {
    let result = `Results for search "${genre}":\n`;
    let booksArr = this.shelf.filter(v => v.genre === genre);
    
    for (const book of booksArr) {
      result += `\uD83D\uDCD6 ${book.author} - "${book.name}"\n`;
    }  

    return result.trim();
  }

  get shelfCondition() {
    return this.shelfCapacity - this.shelf.length;
  }

  toString() {
    let result = '';
    if (this.shelf.length === 0) {
      result = "It's an empty shelf";
    } else {
      result += `"${this.shelfGenre}" shelf in ${this.room} contains:\n`;

      for (const book of this.shelf) {
        result += `\uD83D\uDCD6 "${book.name}" - ${book.author}\n`;
      }
    }

    return result.trim();
  }
}

let livingRoom = new BookCollection("Programming", "livingRoom12", 5)
livingRoom.addBook("Introduction to Programming with C#", "Svetlin Nakov")
livingRoom.addBook("Introduction to Programming with Java", "Svetlin Nakov")
livingRoom.addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.toString());

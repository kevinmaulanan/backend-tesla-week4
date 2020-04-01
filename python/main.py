from populate_scripts import populate_genres, populate_authors, populate_books
from scraping import get_books

if __name__ == '__main__':
    populate_genres()
    books = get_books('science', 1, 20)
    populate_authors(books)
    populate_books(books)
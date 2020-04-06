from populate_scripts import populate_genres, populate_authors, populate_books
from scraping import get_books, get_genres

if __name__ == '__main__':
    populate_genres()
    genres = get_genres()
    genres = list(map(lambda genre: genre.lower().replace(' ', '-'), genres))
    for genre in genres:
        print('Genre: ', genre)
        books = get_books(genre, 1, 30)
        populate_authors(books)
        populate_books(books)
        print('\n')
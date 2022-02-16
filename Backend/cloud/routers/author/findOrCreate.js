import Author from '../../models/author.js'

async function FindOrCreateAuthor(author_name) {
    const query = new Parse.Query("Author");
    query.equalTo("name", author_name);
    var author = (await query.first({ useMasterKey: true }));

    if (author === undefined) {
        author = new Author();
        author.set("name", author_name);
        await author.save(null, { useMasterKey: true })
    }
    
    return author_name;
}

export default FindOrCreateAuthor;
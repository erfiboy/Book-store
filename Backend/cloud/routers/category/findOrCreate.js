import Category from '../../models/category.js'

async function FindOrCreateCategory(category_name) {
    const query = new Parse.Query("Category");
    query.equalTo("name", category_name);
    var category = (await query.first({ useMasterKey: true }));

    if (category === undefined) {
        category = new Category();
        category.set("name", category_name);
        await category.save(null, { useMasterKey: true })
    }
    
    return category_name;
}

export default FindOrCreateCategory;
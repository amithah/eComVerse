const Category = require('../model/Category');
const logger = require('../config/logger');
const create = async (req,res)=>{
try{

    const { name,images=[""],description,slug } = req.body;
    const category = new Category({name,images,description,slug });
    await category.save();
    return  res.status(200).json({
        data:category
      });
}
catch(error){
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
}
}
const update = async (req,res)=>{
  try {
    // Find the category by ID
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      // If category is not found, return 404
      return res.recordNotFound();
    }
  
    // Destructure the request body
    const { name, images = [""], description, slug } = req.body;
  
    // Create an object to store updated values
    const updatedFields = {};
    
    // Compare and update fields if they have changed
    if (name && name !== category.name) {
      updatedFields.name = name;
    }
    if (images && JSON.stringify(images) !== JSON.stringify(category.images)) {
      updatedFields.images = images;
    }
    if (description && description !== category.description) {
      updatedFields.description = description;
    }
    if (slug && slug !== category.slug) {
      updatedFields.slug = slug;
    }
  
    // Update the category only if there are updated fields
    if (Object.keys(updatedFields).length > 0) {
      const updatedItem = await Category.findOneAndUpdate(
        { _id: req.params.id },
        updatedFields,
        { new: true } // Return the updated document
      );
  
      return res.status(200).json({
        data: updatedItem
      });
    } else {
      // No fields have changed
      return res.status(400).json({
        message: "No fields have changed."
      });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
  }

  
  const getAll = async (req, res) => {
    try {
      const category = await Category.find({});
      return res.status(200).json({
        data: category
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(401).json({ data: error.message });
    }
  };
const get = async (req, res) => {
  try {
    const category = await Category.findOne({_id:req.params.id});
    return res.status(200).json({
      data: category
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ data: error.message });
  }
};

const remove = async (req, res) => {
  try {
    // Find the category by ID and remove it
    const category = await Category.findOneAndDelete({ _id: req.params.id });

    if (!category) {
      // If category is not found, return 404
      return res.recordNotFound();
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      data: category
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
   create,
   get,
   getAll,
   update,
   remove
}
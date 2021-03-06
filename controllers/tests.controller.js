const { populate } = require('../models/Test.model');
const Test = require('../models/Test.model');
const Category = require('../models/Category.model');

module.exports.testsController = {
  getTests: async (_, res) => {
    try {
      const test = await Test.find().populate({
         path: "questions",
        populate: {
            path: "answers"
        }
      }).populate('category')
      res.status(200).json(test);
    } catch (err) {
      res.status(404).json({
        error: err.message
      })
    }
  },
  getTestById: async (_, res) => {
    try {
      const { id } = req.params;
      const test = await Test.findById(id).populate('questions', 'questName');
      res.status(200).json(test);
    } catch (err) {
      res.status(404).json({
        error: err.message
      })
    }
  },
  postTest: async (req, res) => {
    try {
      
        const { testName, questions, description } = req.body;
        const { categoryId } = req.params;
        console.log(categoryId)
        const test = await Test.create({ testName, description, questions, category: categoryId });
  
        res.json(test);

    } catch (err) {
      res.status(404).json({
        error: err.message
      })
    }
  },

  getTestsByCategory: async (req, res) => {
    try {
      const certainTests = await Test.find({category: req.params.id});
      res.json(certainTests);
    } catch (e) {
      res.status(404).json({
        error: e.message
      });
    }
  }
}
const router = require('express').Router();
const { Category, Product } = require('../../models');

// endpoints for "api/category"
//
//


router.get('/', async (req, res) => {

  // find all categories
  // be sure to include its associated Products

  try {
    const dataCategory = await Category.findAll( {
      include: [{ model: Product }]
    });

    if (!dataCategory) {
      res.status(404).json({ message: 'At the moment there are no categories to view!' });
      return;
    }

    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const dataCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!dataCategory) {
      res.status(404).json({ message: 'There is no category associated with this id to view!' });
      return;
    }

    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  // create a new category

  try {
    const dataCategory = await Category.create(req.body);
    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {

  // update a category by its `id` value

  try {
    const dataCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!dataCategory) {
      res.status(404).json({ message: 'There is no category associated with this id to update!' });
      return;
    }

    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {

  // delete a category by its `id` value

  try {
    const dataCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dataCategory) {
      res.status(404).json({ message: 'There is no category associated with this id to delete!' });
      return;
    }

    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
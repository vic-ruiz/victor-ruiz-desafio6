const { Router } = require("express");
const router = Router();
const Container = require("../container");
const container = new Container("./products.txt");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
})
router.use(multer({
  storage
}).single('thumbnail'))

router.get('/', (req, res) => {
  const productos = container.getAll();
  res.render('pages/list',{productos})
})


router.post('/',(req,res) => {
  const {body,file} = req;
  body.thumbnail = '/files/'+file.filename;
  container.save(body);
  res.redirect('/');
})


/*router.get("/", async (req, res) => {
  const allProducts = await container.getAll();
  res.status(200).json(allProducts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await container.getById(parseInt(id));

  product
    ? res.status(200).json(product)
    : res.status(404).json({ error: "Product not found" });
});

router.post("/", (req, res) => {
  const { body } = req;
  container.save(body);
  res.json({message: 'Producto guardado', producto: body});
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {body} = req;
  const product = container.getById(parseInt(id));
  product 
  ? container.updateProduct(body,id)
  : res.json({message: `Product with ID: ${id} was not found`});
  res.json({message: `Product Updated`, producto: body})
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const wasDeleted = container.deleteById(parseInt(id));
  res.json({message: `Product with ID: ${id} was deleted`});
})

*/

module.exports = router;

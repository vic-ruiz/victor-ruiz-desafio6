const fs = require("fs");

class Container {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async createFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        console.log("File already exists");
        return false;
      } else {
        console.log("New file created");
        await fs.promises.writeFile(this.filePath, "", "utf8");
        return true;
      }
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
      return false;
    }
  }

  read() {
    let data = [];
    try {
      data = fs.readFileSync(this.filePath, "utf8");
      data.length > 0 ? (data = JSON.parse(data)) : (data = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return data;
  }

  async write(array) {
    let json = JSON.stringify(array);
    try {
      fs.writeFileSync(this.filePath, json, "utf8");
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  save(product) {
    let productsArray = this.read();
    if (productsArray.length == 0) {
      product.id = 1;
    } else {
      let allId = productsArray.map((e) => e.id);
      product.id = Math.max(...allId) + 1;
    }
    productsArray.push(product);
    this.write(productsArray);
  }

  getAll() {
    try {
      const information = fs.readFileSync(this.filePath, "utf-8");
      const data = JSON.parse(information);
      return data;
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  getById(id) {
    try {
      const data = this.read();
      return data.find((producto) => producto.id === id);
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  updateProduct(product, id) {
    let products = this.read()
    let index = products.findIndex((prod) => {
      return prod.id == id
    })
    if(index >= 0){
      product.id = parseInt(id)
      products[index] = product;
      this.write(products);
  }else{
      console.log('Product not found');
  }
  }

  deleteById(id) {
    try {
      const data = this.read();
      const objectIdToBeRemoved = data.find((producto) => producto.id === id);

      if (objectIdToBeRemoved) {
        const index = data.indexOf(objectIdToBeRemoved);
        data.splice(index, 1);
        this.write(data);
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, "", "utf8");
    } catch (error) {
      console.log(`Error Code (${error.code})`);
    }
  }
}

module.exports = Container;

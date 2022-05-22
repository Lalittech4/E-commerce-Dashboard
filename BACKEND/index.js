const express = require('express');
require('./db/config');
const cors = require('cors')
const user = require('./db/user');
const Products = require('./db/Product')
const app = express();
app.use(express.json());
app.use(cors());


// --------------TO REGISTER---------------->>>>>>>>>>>>>>>>>>>>>>>.
app.post("/register", async (req, resp) => {
    let User = new user(req.body);
    let data = await User.save();
    data = data.toObject();
    delete data.password;
    resp.send(data);
});

// -----------------TO-LOGIN------------->>>>>>>>>>>>>>>>>>.
app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let User = await user.findOne(req.body).select('-password');
        if (User) {
            resp.send(User);
        } else {
            resp.send({ result: "no user found" });
        }
    }
    else {
        resp.send({ result: "enter both credentials" })
    }
})

// ------------------TO-ADD PRODUCT-------------------->>>>>>>>.
app.post("/Add-Product", async (req, resp) => {
    let result = new Products(req.body);
    let data = await result.save();
    resp.send(data);
})

app.get("/products", async (req, resp) => {
    let product = await Products.find();
    if (product.length > 0) {
        resp.send(product);
    } else {
        resp.send({ product: "no product found" });
    }
})

app.delete("/products/:id", async (req, resp) => {
    let result = await Products.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get("/products/:id", async (req, resp) => {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {

        resp.send(result);
    } else {
        resp.send({ result: "no record found" });
    }
})

app.put("/products/:id", async (req, resp) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
})

app.get("/search/:key", async (req, resp) => {
    let result = await Products.find({

        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { userId: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    resp.send(result);

});

app.listen(2000);
const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var restaurants = [{ id: 0, name: "Woodshill" }, { id: 1, name: "Fiorellas" }]

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Restaurants API",
            version: "1.0.0"
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/restaurants", (req, res) => {
    res.send(restaurants);
})

app.post("/restaurant", (req, res) => {
    res.send(`${req.body.name} created`)
})

app.delete("/restaurants/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = restaurants.findIndex(restaurant => restaurant.id === id);
    if (index === -1) {
        return res.status(404).send("Restaurant not found");
    }
    restaurants.splice(index, 1);
    res.send("Restaurant deleted successfully");
});

module.exports = app;

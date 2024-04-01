const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var restaurants = [{id:0,name:"Woodshill"},{id:1,name:"Fiorellas"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.get("/restaurants", (req,res)=>{
    res.send(restaurants);
})
app.post("/restaurant",(req,res)=>{
    restaurants.push({id:req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(restaurants)} created`)
})

app.delete("/restaurant/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = restaurants.findIndex(restaurant => restaurant.id === id);
    if (index === -1) {
        return res.status(404).send("Restaurant not found.");
    }
    restaurants.splice(index, 1);
    res.send("Restaurant deleted successfully.");
});

app.listen(4000,()=>console.log('Listening on 4000'))
const expers= require('express');
const Joi = require('joi');
const app =expers();
app.use(expers.json());

const books=[{  
     id:1,
    name:'book 1',
},
{
    id:2,
    name:'book 2',
},
{
    id:2,
    name:'book 3',
},
{
    id:3,
    name:'book 4',
}]

app.get('/' , (req ,res)=>{
     res.send('hello liberary');
});
app.get('/api/books' ,(req,res)=>{
    res.send(books);
});
app.get('/api/books/:id' ,(req ,res)=>{
      const book=books.find(x => x.id ===parseInt(req.params.id));
      if(!books)
      res.status(400).send('found not books');
});


app.post('/api/books', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result);

    if(result.error) {
        return res.status(400).send('found not book');
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    }

    books.push(book);

    res.send(book);
})

app.put('/api/books/:id', (req, res) => {
    const book = books.find(x => x.id === parseInt(req.params.id))
    if(!book){
        res.status(404).send('book not found');
    }
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    console.log(result);

    if(result.error) {
        return res.status(400).send('not find book');
    }
    book.name = req.body.name;
    res.send(book);
})

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(x => x.id === parseInt(req.params.id))
    const index = books.indexOf(req.params.id);
    books.splice(index, 1)

    res.send(book);
});


app.listen(8080 ,()=> console.log('listening on port 3000'));



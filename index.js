const server = require("express");
const app = server();
const port = 3801;
const ejs = require("ejs");

let noiseMakers = []

app.use(server.static("public"));
app.use(server.urlencoded({ extended: true })); // To parse form data
app.set("view engine", "ejs")

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/add',(req, res) =>{
    const name = req.body.name;
    const date = new Date().toLocaleString();

    noiseMakers.push({ name, date });

    res.redirect('/dashboard');
});

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    noiseMakers.splice(index, 1); // Remove the noise maker by index
    
    // Redirect back to the dashboard after deletion
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res)=>{
    res.render('dashboard', {noiseMakers});
})

app.listen(port, ()=>{
    console.log(`Example post runing at http://localhost:${port}`);
})
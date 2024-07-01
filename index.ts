import express,{Express,} from 'express';
import doenv from 'dotenv';
import * as database from './config/database';
import routerClient from './routes/client/index.router';
import routerAdmin from './routes/admin/index.router';
import path from 'path';
import methodOverride from 'method-override';
// flash
import bodyParser from 'body-parser';
import session from 'express-session';
import flash  from 'express-flash';
import cookieParser from 'cookie-parser';
//end flash

doenv.config();
database.connect();


const app:Express = express();
const port:number|string = process.env.PORT||8080;






app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


// flash------------------
app.use(cookieParser("vadasd"));
app.use(session({cookie:{maxAge:6000}}));
app.use(flash());
// flash end ------------------

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

routerClient(app);
routerAdmin(app);

app.get("*",(req,res)=>{
    res.send("bug");
})

app.listen(port,()=>{
    console.log("App run on port: "+process.env.PORT);
})
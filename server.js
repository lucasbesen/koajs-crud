import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import ToDo from './mongoose/todo'
import schema from './graphql/Schema/Schema';
import {graphql} from 'graphql'
import graphqlHTTP from 'koa-graphql';

const app = new Koa();
const router = Router();
const db = mongoose.connection;

app.use(bodyParser());
app.use(respond());
mongoose.connect('mongodb://localhost:27017/local');

router.get('/graphql', graphqlHTTP (ctx => ({
    schema 
    //,graphiql:true
})));

router.post('/quotes', async (ctx,next)=>{
	try {
        const todoItem = new ToDo(ctx.request.body);
		await todoItem.save();
		
        ctx.body = todoItem;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
	}
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

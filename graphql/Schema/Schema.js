import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql/type';

import ToDoMongo from '../../mongoose/todo';

/**
 * @param {Object} fieldASTs
 * @return {Project}
 */

export function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
}

const todoType = new GraphQLObjectType({
    name: 'toDo',
    description: 'toDo item',
    fields: () => ({
        itemId: {
            type: (GraphQLInt),
            description: 'The id of the toDo',
        },
        item: {
            type: GraphQLString,
            description: 'The name of the toDo',
        },
        completed: {
            type: GraphQLBoolean,
            description: 'Completed toDo?'
        }
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            todo: {
                type: new GraphQLList(todoType),
                args: {
                    itemId: {
                        name: 'itemId',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, {itemId}, source, fieldASTs) => {
                const projections = getProjection(fieldASTs);
                const foundItems = new Promise((resolve, reject) => {
                    ToDoMongo.find({itemId}, projections, (err, todos) => {
                        err ? reject(err) : resolve(todos);
                    })
                });
                return foundItems;
                }
            }
        }
    })
});

export default schema;
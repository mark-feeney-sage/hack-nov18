var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    doc(employeeId: ID!) : PayDocument
  }

  type PayDocument {
    id: ID!
    employeeName: String!
    frequency: String
    period: String
    payDate: String
    grossPay: Float
    nettPay: Float
    nettYTD: Float
    sections: [PaySection]
  }

  type PaySection {
    id: ID!
    description: String
    total: Float
    payItems: [PayItem]
  }

  type PayItem {
    id: ID!
    description: String!
    currentAmount: Float
    ytd: Float
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'This is from GraphQL, yay!';
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT || 4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
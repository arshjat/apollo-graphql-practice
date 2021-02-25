const { ApolloServer } = require("apollo-server");
// const fetch = require("node-fetch");
const API = "https://api.spacexdata.com/v3/launches";
const axios = require("axios");
// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
        launches: [Launch]!
        launch(flight_number: Int!): Launch
    }

	type Launch {
		flight_number: Int!
        mission_name: String!
        launch_year: String!
        launch_date_local: String!
        launch_success: Boolean
        rocket: Rocket!
	}

	type Rocket {
		rocket_id : String!
        rocket_name : String!
        rocket_type : String!
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    launches: () => {
        return axios.get(API).then(res => res.data);
    },

    launch: (_, { flight_number }) => {
      return axios.get(`${API}/${flight_number}`).then(res => res.data);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

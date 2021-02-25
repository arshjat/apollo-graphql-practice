import Launches from './components/launches';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloClient, InMemoryCache } from '@apollo/client';
import {ApolloProvider, } from 'react-apollo';
import Launch from './components/launch';
import gql from 'graphql-tag';
import logo from './logo.png';

const cache = new InMemoryCache({
  typePolicies: {
      Launch: {
        keyFields: ["flight_number"],
      }
    }
})



const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache : cache
})

// const res = client.readQuery({
//   query: gql`
//     query LaunchQuery{
//         launches {
//             flight_number
//             mission_name
//             launch_date_local
//             launch_success
//         }
//     }`
// });
// console.log("read query : ",res );

console.log(cache )

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="container">
        <img src={logo} alt="SpaceX" style={{ width: 300, display:'block', margin:'auto'}} />
      </div>
      <Switch>
      <Route path='/' exact component={Launches} />
      <Route path='/launch/:flight_number' exact component={Launch} />
      </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;

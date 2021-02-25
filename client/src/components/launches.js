import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LaunchItem from './launchItem';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

export default function Launches() {
    return (
        <>
            <h1 className="display-4 my-3">Launches</h1>
            <Query query={LAUNCHES_QUERY}>
                {
                    ({loading, error, data}) => {
                        if(loading) return <h4>Loading ...</h4>
                        if(error) console.log("heythere",error);
                        console.log(data)
                        return (
                            <>{
                                data.launches.map(launch => {
                                    return <LaunchItem key={launch.flight_number} launch={launch} />
                                })
                           } </>
                        );
                    }
                }
            </Query>
        </>
    );
}


// import React from 'react';
// import gql from 'graphql-tag';
// import {useQuery} from 'react-apollo';
// import LaunchItems from './launchItems';

// const LAUNCHES_QUERY = gql`
//     query LaunchesQuery($cursor : String) {
//         launches(cursor:$cursor){
//             flight_number
//             mission_name
//             launch_date_local
//             launch_success
//         }
//     }
// `;

// export default function Launches() {
    
//     const {loading, error, data, fetchMore} = useQuery(
//         LAUNCHES_QUERY,
//     );
    
//     if(loading) return <h4>Loading ...</h4>
//     if(error) console.log(error);
//     console.log(data);
//     return (
//        <LaunchItems
//        launchItems = {data.launches}
//        onLoadMore = {() => 
//             fetchMore({
//                 query : LAUNCHES_QUERY,
//                 variables : {cursor : data.launches.flight_number},
//                 updateQuery: (prev, {fetchMoreResult}) => {
//                     const prevEntry = prev.entry;
//                     console.log(fetchMoreResult);
//                     const newLaunches = fetchMoreResult.moreLaunches.launches;
//                     const newCursor = fetchMoreResult.newLaunches.launches.flight_number;
//                     return {
//                         cursor : newCursor,
//                         entry : {
//                             launches : [ ...prevEntry.launches,...newLaunches]
//                         },
//                         __typename: prevEntry.__typename
//                     }
//                 }
//             })
//         }
//        />
//     );
// }
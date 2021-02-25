import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link, useParams} from 'react-router-dom';

const LaunchQuery = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number : $flight_number){
            flight_number
            mission_name
            launch_date_local
            launch_year
            launch_success
            rocket{
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export default function Launch(){
    
    const params = useParams();
    const flight_number = parseInt(params.flight_number);
    return (
        <>
            <Query query={LaunchQuery} variables={{flight_number}}>
                {
                    ({loading, error, data}) => {
                        if(loading) return <h4>Loading...</h4>;
                        if(error) console.log(error);
                        
                        const {mission_name, flight_number, launch_year, launch_success, rocket: {rocket_id, rocket_name, rocket_type}} = data.launch;
                        
                        return (<>
                            <h1 className="display-4 my-3"><span className="text-dark">Mission: {mission_name}</span></h1>
                            <h4 className="mb-3">Launch Details :</h4>
                            <ul className="list-group">
                                <li className="list-group-item">Flight Number : {flight_number}</li>
                                <li className="list-group-item">Launch Year : {launch_year}</li>
                                <li className="list-group-item">Launch Successful : {launch_success ? "Yes" : "No"}</li> 
                            </ul>
                            <h4 className="my-3">Rocket Details :</h4>
                            <ul className="list-group">
                                <li className="list-group-item">Rocket ID : {rocket_id}</li>
                                <li className="list-group-item">Rocket Name : {rocket_name}</li>
                                <li className="list-group-item">Rocket Type : {rocket_type ? "Yes" : "No"}</li> 
                            </ul>
                            <Link to='/' className="btn btn-secondary">Back</Link>
                        </>);
                    }
                }
            </Query>
        </>
    );
};
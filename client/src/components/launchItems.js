import LaunchItem from './launchItem';
export default function LaunchItems ({launchItems}) {
    return (
        <>
        {
            launchItems.map(launch => {
                return <LaunchItem key={launch.flight_number} launch={launch} />
            })
        } 
        </>
    );
}
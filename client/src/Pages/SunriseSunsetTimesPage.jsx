import Loading from "../Components/Loading";
import {useState} from "react";
import SunriseSunsetTimesForm from "../Components/SunriseSunsetTimesForm";

const getSunriseSunsetTimes = (date, city) => {
    return fetch(`api/sunrise-sunset-times?date=${date}&city=${city}`,
        {
            method: "GET",
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
        }
    ).then(res => res.json());
}

const SunriseSunsetTimesPage = () => {
    const [isLoading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [sunriseSunsetResults, setSunriseSunsetResults] = useState();

    const handleGetSunriseSunsetTimes = (date, cityName) => {
        setLoading(true);
        getSunriseSunsetTimes(date, cityName).then(resp => {
            setSunriseSunsetResults(resp);
            setLoading(false);
            setShowForm(false);
        });
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (showForm) {
        return (
            <div>
                <h2>Get sunrise and sunset times for a given day and city!</h2>
                <SunriseSunsetTimesForm
                    onSave={handleGetSunriseSunsetTimes}
                />
            </div>
        )
    }

    return <div>
        <h2>The sunrise and sunset times
            for {sunriseSunsetResults.city} on {sunriseSunsetResults.date} are:</h2>
        <ul>
            <li>Sunrise: {sunriseSunsetResults.sunrise}</li>
            <li>Sunset: {sunriseSunsetResults.sunset}</li>
        </ul>
        <button type="button" onClick={() => setShowForm(true)}>
            Show another date/city!
        </button>
    </div>

}

export default SunriseSunsetTimesPage;
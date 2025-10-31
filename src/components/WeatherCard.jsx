import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function WeatherCard() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const lat = 60.1699
                const lon = 24.9384
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m&current_weather=true&timezone=Europe/Helsinki`
                const res = await axios.get(url)
                setWeather({
                    temp: res.data.current_weather.temperature,
                    wind: res.data.current_weather.windspeed
                })
            } catch (e) {
                console.error(e)
                setWeather({ temp: null, wind: null })
            } finally {
                setLoading(false)
            }
        }
        fetchWeather()
    }, [])


    if (loading) return <div>Loading weather...</div>


    return (
        <div>
            <h3 className="text-md font-medium mb-2">Weather (Helsinki)</h3>
            <div className="flex items-center gap-4">
                <div>
                    <div className="text-3xl font-semibold">{weather.temp !== null ? `${weather.temp}°C` : '—'}</div>
                    <div className="text-sm text-slate-500">Temperature</div>
                </div>
                <div className="pl-4 border-l border-slate-100">
                    <div className="text-2xl">{weather.wind !== null ? `${weather.wind} m/s` : '—'}</div>
                    <div className="text-sm text-slate-500">Wind Speed</div>
                </div>
            </div>
        </div>
    )
}
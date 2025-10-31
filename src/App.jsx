import React, { useEffect, useState } from 'react'
import PriceChart from './components/PriceChart'
import WeatherCard from './components/WeatherCard'
import RecommendationCard from './components/RecommendationCard'
import { fetchElectricityPrices } from './utils/fetchElectricityPrice'


export default function App() {
    const [prices, setPrices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    async function loadData() {
        setLoading(true)
        setError(null)
        try {
            const p = await fetchElectricityPrices()
            setPrices(p)
        } catch (e) {
            console.error(e)
            setError('Failed to fetch data — using mock data instead.')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        loadData()
        const id = setInterval(loadData, 1000 * 60 * 60)
        return () => clearInterval(id)
    }, [])


    return (
        <div className="container">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Smart Energy Dashboard ⚡</h1>
                <div className="text-sm text-slate-600">Live demo · React + Vite</div>
            </header>


            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="p-4 rounded-lg shadow bg-white">
                    <h2 className="text-lg font-medium mb-2">Electricity Price (24h)</h2>
                    {loading ? <div>Loading...</div> : <PriceChart data={prices} />}
                    {error && <div className="mt-2 text-sm text-amber-600">{error}</div>}
                </section>


                <aside className="space-y-6">
                    <div className="p-4 rounded-lg shadow bg-white">
                        <WeatherCard />
                    </div>


                    <div className="p-4 rounded-lg shadow bg-white">
                        <RecommendationCard prices={prices} />
                    </div>
                </aside>
            </main>


            <footer className="mt-6 text-xs text-slate-500">
                This demo uses either a configured API or local mock data — check the README for details on connecting a real data source.
            </footer>
        </div>
    )
}
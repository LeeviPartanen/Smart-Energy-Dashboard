import axios from 'axios'


export async function fetchElectricityPrices() {
    const envUrl = import.meta.env.VITE_PRICE_API_URL || import.meta.env.REACT_APP_PRICE_API_URL || null


    if (envUrl) {
        try {
            const res = await axios.get(envUrl)
            const data = res.data
            if (data && data.records) {
                const list = data.records.slice(0, 24).map(r => ({
                    hour: new Date(r.HourUTC || r.Datetime || r.Time || r.Hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    price: Number(r.SpotPriceEUR || r.Price || r.price || r.SpotPrice || r.PriceArea) || 0
                }))
                return list
            }
            if (Array.isArray(data)) {
                return data.slice(0, 24).map(d => ({ hour: d.hour, price: Number(d.price) }))
            }
        } catch (e) {
            console.warn('Failed to fetch price API:', e.message)
        }
    }


    // fallback mock data
    const now = new Date()
    const mock = Array.from({ length: 24 }).map((_, i) => {
        const dt = new Date(now.getTime() + i * 60 * 60 * 1000)
        const base = 0.08 + 0.06 * Math.sin((i / 24) * Math.PI * 2) + (Math.random() - 0.5) * 0.01
        return { hour: dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), price: Number(base.toFixed(3)) }
    })


    return mock
}
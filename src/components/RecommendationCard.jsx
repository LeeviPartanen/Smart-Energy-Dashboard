import React, { useMemo } from 'react'


function scoreForPrice(price, avg) {
    const pct = (price - avg) / avg
    if (pct <= -0.2) return -1
    if (pct >= 0.2) return 1
    return 0
}


export default function RecommendationCard({ prices }) {
    const { recommendation, details } = useMemo(() => {
        if (!prices || prices.length === 0) return { recommendation: 'No data', details: null }
        const avg = prices.reduce((s, p) => s + p.price, 0) / prices.length
        const now = prices[0]
        const s = scoreForPrice(now.price, avg)
        let rec = 'No information'
        if (s === -1) rec = '✅ CHEAP HOUR — good time to use electricity.'
        if (s === 0) rec = '⚠️ AVERAGE PRICE — use as needed.'
        if (s === 1) rec = '⛔ EXPENSIVE HOUR — better to wait.'


        return { recommendation: rec, details: { avg: avg.toFixed(3), now: now.price.toFixed(3) } }
    }, [prices])


    return (
        <div>
            <h3 className="text-md font-medium mb-2">Smart Recommendation</h3>
            <div className="text-lg font-semibold mb-2">{recommendation}</div>
            {details && (
                <div className="text-sm text-slate-600">
                    <div>Current: {details.now} €/kWh</div>
                    <div>24h average: {details.avg} €/kWh</div>
                </div>
            )}
        </div>
    )
}
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'


export default function PriceChart({ data }) {
    const formatted = data.map(d => ({ ...d, hourLabel: d.hour }))


    return (
        <div style={{ height: 320 }}>
            <ResponsiveContainer>
                <LineChart data={formatted} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hourLabel" tick={{ fontSize: 12 }} />
                    <YAxis unit=" €/kWh" tick={{ fontSize: 12 }} />
                    <Tooltip formatter={value => `${value.toFixed(3)} €/kWh`} />
                    <Line type="monotone" dataKey="price" stroke="#1f7a8c" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
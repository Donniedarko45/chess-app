import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface StatsGraphProps {
  data: {
    date: string
    rating: number
  }[]
}

export const StatsGraph = ({ data }: StatsGraphProps) => {
  return (
    <div className="w-full h-[400px] bg-surface p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6e6a86" />
          <XAxis
            dataKey="date"
            stroke="#e0def4"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#e0def4" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f1d2e',
              border: 'none',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#eb6f92"
            strokeWidth={2}
            dot={{ fill: '#eb6f92' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 
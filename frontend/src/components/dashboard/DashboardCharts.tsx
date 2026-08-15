import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Mar",
    meals: 9200,
    deliveries: 640,
    ngo: 18,
  },
  {
    month: "Apr",
    meals: 11350,
    deliveries: 780,
    ngo: 21,
  },
  {
    month: "May",
    meals: 10120,
    deliveries: 705,
    ngo: 19,
  },
  {
    month: "Jun",
    meals: 13780,
    deliveries: 910,
    ngo: 25,
  },
  {
    month: "Jul",
    meals: 12150,
    deliveries: 840,
    ngo: 23,
  },
  {
    month: "Aug",
    meals: 14680,
    deliveries: 980,
    ngo: 27,
  },
];

export default function DashboardCharts() {
  return (
    <div className="activity-chart">

      {/* ================= CHART HEADER ================= */}

      <div className="chart-legend">

        <div className="legend-item">
          <span
            className="legend-dot meals-dot"
          ></span>
          <span>Meals rescued</span>
        </div>

        <div className="legend-item">
          <span
            className="legend-dot delivery-dot"
          ></span>
          <span>Deliveries</span>
        </div>

        <div className="legend-item">
          <span
            className="legend-dot ngo-dot"
          ></span>
          <span>NGO distributions</span>
        </div>

      </div>

      {/* ================= CHART ================= */}

      <div
        style={{
          width: "100%",
          height: "220px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e6ece8"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7b8882",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7b8882",
                fontSize: 10,
              }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }

                return value;
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#cbd8d0",
                strokeWidth: 1,
              }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e1e8e3",
                borderRadius: "10px",
                boxShadow:
                  "0 10px 30px rgba(18, 60, 42, 0.10)",
                padding: "10px 12px",
                fontSize: "11px",
              }}
              labelStyle={{
                fontWeight: 700,
                color: "#183b2a",
                marginBottom: "6px",
              }}
              formatter={(value, name) => {

                const numericValue = Number(value);

                if (name === "Meals rescued") {
                  return [
                    `${numericValue.toLocaleString()} meals`,
                    "Meals rescued",
                  ];
                }

                if (name === "Deliveries") {
                  return [
                    `${numericValue.toLocaleString()}`,
                    "Deliveries",
                  ];
                }

                return [
                  `${numericValue.toLocaleString()}`,
                  "NGO distributions",
                ];
              }}
            />

            {/* MEALS */}

            <Line
              type="monotone"
              dataKey="meals"
              name="Meals rescued"
              stroke="#238b5b"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "#238b5b",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
              }}
            />

            {/* DELIVERIES */}

            <Line
              type="monotone"
              dataKey="deliveries"
              name="Deliveries"
              stroke="#d99a25"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                r: 2,
                fill: "#d99a25",
                stroke: "#ffffff",
                strokeWidth: 1,
              }}
              activeDot={{
                r: 5,
              }}
            />

            {/* NGO DISTRIBUTIONS */}

            <Line
              type="monotone"
              dataKey="ngo"
              name="NGO distributions"
              stroke="#6b7280"
              strokeWidth={2}
              dot={{
                r: 2,
                fill: "#6b7280",
                stroke: "#ffffff",
                strokeWidth: 1,
              }}
              activeDot={{
                r: 5,
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
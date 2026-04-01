import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const PiesChart = ({ Data }) => {
  const COLORS = ["#2CA24C", "#F7931A", "rgb(2 110 174)", "#F4C542", "#D7263D"];
  const formattedData = Data.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const total = formattedData.reduce((sum, item) => sum + item.value, 0);
  const allZero = total === 0;

  const chartData = allZero
    ? [{ name: "No Data", value: 1 }]
    : formattedData;

  const chartColors = allZero ? ["#dcdcdcff"] : COLORS;

  return (
    <div className="customer-result-chart-container">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;

                  return (
                    <div
                      style={{
                        background: "var(--card)",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 10px 25px var(--primary-hover)",
                        fontWeight: 600,
                        minWidth: "180px",
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}>
                        {data.name || "N/A"}
                      </div>
                      <div>Count: {!allZero ? data.value : 0}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="custom-legend">
          {formattedData.map((entry, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                }}
              >
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "4px",
                    flexShrink: 0,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <span>{entry.name || "N/A"}</span>
                  <span>{entry.value || 0}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const BarsChart = ({ Data }) => {
  const formattedData = Data.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const sortedData = [...formattedData].sort((a, b) => {
    if (a.name === "Other") return 1;
    if (b.name === "Other") return -1;
    return 0;
  });

  return (
    <ResponsiveContainer className="onboarding-chart" width="100%" height={250}>
      <BarChart
        data={sortedData}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient
            id="onboarding-bar-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={1} />
            <stop
              offset="95%"
              stopColor="var(--primary-hover)"
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
        />
        <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />

        <Tooltip
          formatter={(value) => [value, "Uploads"]}
          cursor={{ fill: "var(--primary-hover)" }}
          contentStyle={{
            fontWeight: 600,
            borderRadius: 12,
            padding: "12px",
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 25px var(--primary-hover)",
            minWidth: "180px",
          }}
        />

        <Bar
          dataKey="value"
          name="Total Users"
          radius={[8, 8, 0, 0]}
          fill="url(#onboarding-bar-gradient)"
          animationDuration={2000}
          animationBegin={300}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

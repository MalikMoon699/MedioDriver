import React, { useEffect, useState } from "react";
import "../assets/style/Dashboard.css";
import { Upload, Eye, HardDrive, Key } from "lucide-react";
import Loader from "../components/Loader";
import { BarsChart, PiesChart } from "../components/DashboardCharts";
import {
  fallBackWeeklyUploads,
  fallBackByTypeUploads,
  getStates,
  getWeeklyUploads,
  getUploadsByType,
  getRecentUploads,
} from "../services/dashboard.services.js";
import { timeAgo, formatFileSize } from "../utils/Helper.js";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [weeklyUploads, setWeeklyUploads] = useState([]);
  const [byTypeUploads, setByTypeUploads] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const limitRecentUploads = 5;

useEffect(() => {
  loadDashboardData();
}, []);

const loadDashboardData = async () => {
  try {
    setLoading(true);

    const [statesRes, weeklyUploadsRes, uploadsByTypeRes, recentUploadsRes] =
      await Promise.all([
        getStates(),
        getWeeklyUploads(),
        getUploadsByType(),
        getRecentUploads(limitRecentUploads),
      ]);

    setStates(statesRes);
    setWeeklyUploads(weeklyUploadsRes);
    setByTypeUploads(uploadsByTypeRes);
    setRecentUploads(recentUploadsRes);
  } catch (err) {
    console.error("Failed to load Dashboard Data:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-container">
      <div className="dashboard-stats-row">
        <StatesCard
          iconBg="var(--primary-hover)"
          iconColor="var(--primary)"
          title="Total Uploads"
          value={states?.totalUploads || 0}
          icon={Upload}
          loading={loading}
        />
        <StatesCard
          iconBg="#eaf3fc"
          iconColor="#308ce8"
          title="Total Views"
          value={states?.totalViews || 0}
          icon={Eye}
          loading={loading}
        />
        <StatesCard
          iconBg="#fef1e7"
          iconColor="#f97415"
          title="Storage Used"
          value={states?.storageUsed || 0}
          icon={HardDrive}
          loading={loading}
        />
        <StatesCard
          iconBg="var(--primary-hover)"
          iconColor="var(--primary)"
          title="API Calls"
          value={states?.apiCalls || 0}
          icon={Key}
          loading={loading}
        />
      </div>
      <div className="dashboard-charts-wrapper">
        <ChartCard
          title="Uploads This Week"
          contentStyle={{ marginLeft: "-20px" }}
          loading={loading}
          chartType={BarsChart}
          ChartData={
            weeklyUploads?.length > 0 ? weeklyUploads : fallBackWeeklyUploads
          }
        />
        <ChartCard
          title="By Type"
          contentStyle={{ marginLeft: "-20px", padding: "20px" }}
          loading={loading}
          chartType={PiesChart}
          ChartData={
            byTypeUploads?.length > 0 ? byTypeUploads : fallBackByTypeUploads
          }
        />
      </div>
      <div className="chart-container">
        <div className="chart-header">
          <h2>Recent Uploads</h2>
        </div>
        <div className="recent-uploads-table-container">
          {loading ? (
            <Loader style={{ height: "300px" }} />
          ) : recentUploads?.length > 0 ? (
            <div className="media-record-table" style={{ borderRadius: "0px" }}>
              <div
                className="media-record-table-header"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
              >
                <span>Name</span>
                <span>Type</span>
                <span>Size</span>
                <span>Upload Date</span>
              </div>
              {recentUploads.slice(0, limitRecentUploads).map((upload) => (
                <div
                  className="media-record-row"
                  style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
                  key={upload.id}
                >
                  <span className="elepsis">{upload?.name || "N/A"}</span>
                  <span>{upload?.type || "N/A"}</span>
                  <span>{formatFileSize(upload?.size) || "N/A"}</span>
                  <span>{timeAgo(upload?.createdAt) || "N/A"}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-data">No recent uploads found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export const StatesCard = ({
  iconBg = "",
  iconColor = "#fff",
  title = "",
  value = "",
  icon: Icon,
  loading = false,
}) => {
  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-card-content">
        <p className="dashboard-stat-title">{title}</p>
        <h3 className="dashboard-stat-value">
          {loading ? <Loader size="25" stroke="2" /> : <>{value}</>}
        </h3>
      </div>
      <div style={{ background: iconBg }} className="dashboard-stat-icon">
        <Icon color={iconColor} />
      </div>
    </div>
  );
};

const ChartCard = ({
  title = "",
  chartType: Chart,
  ChartData = [],
  contentStyle = {},
  loading = false,
}) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>{title}</h2>
      </div>
      <div style={contentStyle} className="chart-content-cotainer">
        {loading ? (
          <Loader style={{ height: "300px" }} />
        ) : (
          <Chart Data={ChartData} />
        )}
      </div>
    </div>
  );
};

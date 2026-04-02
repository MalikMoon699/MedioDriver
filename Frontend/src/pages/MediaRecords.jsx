import React, { useEffect, useState } from "react";
import "../assets/style/MediaRecords.css";
import {
  LayoutGrid,
  List,
  Eye,
  Download,
  Trash2,
  Image,
  Music,
  Video,
  FileText,
} from "lucide-react";
import { LoadMore, SearchInput, StorageSearch, TopBar } from "../components/CustomComponents";
import { deleteMedia, getMediaRecords } from "../services/upload.services";
import Loader from "../components/Loader";
import { formateDate, formatFileSize, handleDownload } from "../utils/Helper";
import { toast } from "sonner";
import { limit } from "../utils/constants";
import { useDebounce } from "../utils/hooks/useDebounce";

const getIcon = (type = "") => {
  if (type.includes("audio")) return <Music size={20} />;
  else if (type.includes("video")) return <Video size={20} />;
  else if (type.includes("image")) return <Image size={20} />;
  else return <FileText size={20} />;
};

const MediaRecords = () => {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const searchDebounce = useDebounce(search, 500);

  const filters = [
    { label: "All", value: "all" },
    { label: "Image", value: "image" },
    { label: "Audio", value: "audio" },
    { label: "Video", value: "video" },
    { label: "Pdf", value: "pdf" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => {
    setPage(1);
    getRecords(1);
  }, [filter, searchDebounce]);

  const getRecords = async (nextPage = 1) => {
    try {
      if (nextPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await getMediaRecords({
        page: nextPage,
        limit,
        contentType: filter !== "all" ? filter : undefined,
        search: searchDebounce || undefined,
      });

      const newFiles = res?.files || [];

      setRecords((prev) =>
        nextPage === 1 ? newFiles : [...prev, ...newFiles],
      );

      setPage(res?.meta?.page || 1);
      setLastPage(res?.meta?.totalPages || 1);
    } catch (err) {
      console.log("Failed to load Media Records:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (page < lastPage && !loadingMore) {
      getRecords(page + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      setRecords(records.filter((r) => r._id !== id));
      toast.success("Media deleted successfully!");
    } catch (err) {
      console.log("Failed to delete media:", err);
      toast.error(err?.message || "Failed to delete media!");
    }
  };

  return (
    <>
      <TopBar title="Media Records" />
      <div className="page-container">
        <div className="media-record-topbar">
          <StorageSearch setValue={setSearch} width="310px"  storage="mediaRecordSearchHistory"/>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div className="media-record-filters">
              {filters.map((f, i) => (
                <button
                  key={i}
                  className={`media-record-filter ${filter === f.value ? "active" : ""}`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="divider" />

            <div className="media-record-view-toggle">
              <button
                className={view === "grid" ? "active icon" : "icon"}
                onClick={() => setView("grid")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={view === "list" ? "active icon" : "icon"}
                onClick={() => setView("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {view === "list" && (
          <div className="media-record-table-container">
            <div className="media-record-table">
              <div className="media-record-table-header">
                <span>File</span>
                <span>Type</span>
                <span>Size</span>
                <span>Views</span>
                <span>Date</span>
                <span>Actions</span>
              </div>
              {loading ? (
                <Loader style={{ height: "300px" }} />
              ) : records?.length > 0 ? (
                records.map((item, i) => (
                  <div key={i} className="media-record-row">
                    <div
                      style={{ width: "300px" }}
                      className="media-record-file"
                    >
                      <span className="media-record-icon">
                        {getIcon(item?.contentType)}
                      </span>
                      <span className="elepsis">{item?.filename || "N/A"}</span>
                    </div>
                    <span>{item?.contentType || "N/A"}</span>
                    <span>{formatFileSize(item?.size) || "N/A"}</span>
                    <span>{item?.views || 0}</span>
                    <span>{formateDate(item.createdAt)}</span>

                    <div className="media-record-actions">
                      <Eye
                        onClick={() => window.open(item?.fileUrl, "_blank")}
                        size={16}
                      />
                      <Download
                        onClick={() => handleDownload(item?.fileUrl)}
                        size={16}
                      />
                      <Trash2
                        onClick={() => handleDelete(item?._id)}
                        size={16}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-data">No media records found.</p>
              )}
            </div>
          </div>
        )}

        {view === "grid" &&
          (loading ? (
            <Loader style={{ height: "300px" }} />
          ) : records?.length > 0 ? (
            <div className="media-record-grid">
              {records.map((item, i) => (
                <div key={i} className="media-record-card">
                  <div className="media-record-card-icon">
                    {getIcon(item?.contentType)}
                  </div>

                  <p className="media-record-card-name elepsis">
                    {item?.filename || "N/A"}
                  </p>

                  <span className="media-record-card-meta">
                    {formatFileSize(item?.size) || "N/A"} • {item?.views || 0}{" "}
                    views
                  </span>

                  <div className="media-record-card-actions">
                    <button
                      onClick={() => window.open(item?.fileUrl, "_blank")}
                    >
                      <Eye size={16} /> View
                    </button>
                    <button onClick={() => handleDownload(item?.fileUrl)}>
                      <Download size={16} /> Download
                    </button>
                    <button onClick={() => handleDelete(item?._id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-data">No media records found.</p>
          ))}
        <LoadMore
          loading={loadingMore}
          disabled={loadingMore}
          show={loadingMore || page < lastPage}
          onLoad={handleLoadMore}
        />
      </div>
    </>
  );
};

export default MediaRecords;

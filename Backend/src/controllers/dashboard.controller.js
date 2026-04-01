import ApiKey from "../models/apiKey.model.js";
import KeyUsage from "../models/apiUsage.model.js";
import Media from "../models/media.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getStates = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const [uploads, viewsAgg, storageAgg, apiCallsAgg] = await Promise.all([
      Media.countDocuments({ uploadBy: userObjectId }),

      Media.aggregate([
        { $match: { uploadBy: userObjectId } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
      ]),

      Media.aggregate([
        { $match: { uploadBy: userObjectId } },
        { $group: { _id: null, totalSize: { $sum: "$size" } } },
      ]),

      KeyUsage.aggregate([
        { $match: { user: userObjectId } },
        { $group: { _id: null, totalCalls: { $sum: "$calls" } } },
      ]),
    ]);

    const formatNumber = (num) => {
      if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
      if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
      if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
      return num;
    };

    const formatStorage = (bytes) => {
      if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + " GB";
      if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + " MB";
      if (bytes >= 1e3) return (bytes / 1e3).toFixed(2) + " KB";
      return bytes + " B";
    };

    const totalViews = viewsAgg[0]?.totalViews || 0;
    const totalStorage = storageAgg[0]?.totalSize || 0;
    const totalApiCalls = apiCallsAgg[0]?.totalCalls || 0;

    res.json({
      totalUploads: uploads,
      totalViews: formatNumber(totalViews),
      storageUsed: formatStorage(totalStorage),
      apiCalls: formatNumber(totalApiCalls),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const getThisWeekUploads = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const uploads = await Media.aggregate([
      {
        $match: {
          uploadBy: userObjectId,
          createdAt: { $gte: startOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const daysMap = {
      1: "Sun",
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
    };

    const result = Object.values(daysMap).map((day) => ({
      label: day,
      count: 0,
    }));

    uploads.forEach((item) => {
      const index = item._id - 1;
      result[index].count = item.count;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch weekly uploads" });
  }
};

export const getUploadsByType = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const data = await Media.aggregate([
      {
        $match: { uploadBy: userObjectId },
      },
      {
        $group: {
          _id: "$contentType",
          count: { $sum: 1 },
        },
      },
    ]);

    const getType = (mime) => {
      if (!mime) return "Others";
      if (mime.startsWith("image/")) return "Images";
      if (mime.startsWith("video/")) return "Videos";
      if (mime.startsWith("audio/")) return "Audio";
      if (
        mime.includes("pdf") ||
        mime.includes("doc") ||
        mime.includes("text") ||
        mime.includes("sheet")
      )
        return "Documents";
      return "Others";
    };

    const result = [
      { label: "Images", count: 0 },
      { label: "Videos", count: 0 },
      { label: "Documents", count: 0 },
      { label: "Audio", count: 0 },
      { label: "Others", count: 0 },
    ];

    data.forEach((item) => {
      const label = getType(item._id);
      const index = result.findIndex((r) => r.label === label);
      if (index !== -1) {
        result[index].count += item.count;
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch uploads by type" });
  }
};

export const getRecentUploads = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const limit = parseInt(req.params.limit) || 5;

    const uploads = await Media.find({ uploadBy: userObjectId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("filename contentType size createdAt gridfsId");

    const formatted = uploads.map((item) => ({
      id: item._id,
      name: item.filename,
      type: item.contentType,
      size: item.size,
      createdAt: item.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recent uploads" });
  }
};
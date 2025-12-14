import { ItemReport } from "../models/ItemReport.js";

export const createReport = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      category,
      campus,
      building,
      locationText,
      date
    } = req.body;

    if (!type || !title || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const report = await ItemReport.create({
      reporter: req.user._id,
      type,
      title,
      description,
      category,
      campus,
      building,
      locationText,
      date
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to create report" });
  }
};

export const getReports = async (req, res) => {
  try {
    const {
      type,
      category,
      campus,
      status,
      q
    } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (campus) filter.campus = campus;
    if (status) filter.status = status;

    let query = ItemReport.find(filter).populate("reporter", "name email");

    if (q) {
      query = query.find({ $text: { $search: q } });
    }

    const reports = await query.sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await ItemReport.findById(req.params.id)
      .populate("reporter", "name email");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report" });
  }
};
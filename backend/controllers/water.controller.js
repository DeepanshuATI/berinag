import WaterUsage from "../models/usage.model.js";

export const addUsage = async (req, res) => {
  try {
    const { amountLiters, notes, date } = req.body;
    if (!amountLiters || amountLiters <= 0) {
      return res.status(400).json({ msg: "amountLiters must be > 0" });
    }
    const usage = await WaterUsage.create({
      userId: req.user.id,
      amountLiters,
      notes,
      date: date ? new Date(date) : undefined,
    });
    res.status(201).json({ msg: "Usage added", usage });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getMyUsages = async (req, res) => {
  try {
    const usages = await WaterUsage.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ usages });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const usage = await WaterUsage.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!usage) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const stats = async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = { userId: req.user.id };
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }
    const result = await WaterUsage.aggregate([
      { $match: match },
      { $group: { _id: null, totalLiters: { $sum: "$amountLiters" }, count: { $sum: 1 } } },
    ]);
    const { totalLiters = 0, count = 0 } = result[0] || {};
    res.json({ totalLiters, entries: count });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



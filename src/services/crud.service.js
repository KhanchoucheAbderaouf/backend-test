module.exports = {
    findAll: (Model) => {
        return (req, res) => {
            try {
                let { size, page, order, direction } = req.query;
                let pagination = {};
                if (size) {
                    pagination.limit = size;
                    pagination.skip = (page && page > 0 ? page - 1 : 0) * size;
                }
                if (order) {
                    pagination.sort = {};
                    pagination.sort[order] = direction
                        ? parseInt(direction)
                        : 1;
                }
                Model.find({}, {}, pagination, async (error, models) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    }
                    if (!models) {
                        return res
                            .status(404)
                            .json({ error: "Documents not found" });
                    }
                    return res.status(200).json(models);
                });
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        };
    },
    findOne: (Model) => {
        return (req, res) => {
            try {
                Model.findOne({ _id: req.params.id }, async (error, model) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    }
                    if (!model) {
                        return res
                            .status(404)
                            .json({ error: "Document not found" });
                    }
                    return res.status(200).json(model);
                });
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        };
    },
    remove: (Model) => {
        return (req, res) => {
            try {
                Model.findOne({ _id: req.params.id }, async (error, model) => {
                    if (error) {
                        return res.status(400).json({ error: error });
                    }
                    if (!model) {
                        return res
                            .status(404)
                            .json({ error: "Document not found" });
                    }
                    await Model.deleteOne({ _id: req.params.id });
                    return res
                        .status(200)
                        .json({ message: "Document deleted successfully" });
                });
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        };
    },
};

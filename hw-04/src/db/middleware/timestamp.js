const setTimestamp = (schema) => {
  // add 2 fields to Schema
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  // create hook on pre-save
  schema.pre('save', function (next) {
    const now = Date.now();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now
    }
    next()
  });
};

module.exports = setTimestamp;
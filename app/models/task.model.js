module.exports = (mongoose) => {
  let statuses = ["COMPLETED", "INCOMPLETE"];
  const schema = mongoose.Schema(
    {
      title: { type: String, required: true },
      description: String,
      status: {
        type: String,
        enum: statuses,
        validator: (status) => statuses.includes(status),
      },
      deadline: Date,
    },
    { timestamps: true }
  );

  const Task = mongoose.model("task", schema);
  return Task;
};

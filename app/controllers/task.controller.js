const db = require("../models");
const Task = db.tasks;

const statusCodes = require("../payload/http.status.codes.js");

exports.create = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.send(
        require("../payload/payload")(
          false,
          statusCodes.BAD_REQUEST,
          null,
          "Title can not be empty!"
        )
      );
      return;
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status.trim() ?? "INCOMPLETE",
      deadline: req.body.deadline
        ? new Date(req.body.deadline).getTime()
        : new Date().getTime(),
    });

    const response = await task.save(task);
    res.send(require("../payload/payload")(true, statusCodes.OK, response));
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const response = await Task.find();
    res.send(require("../payload/payload")(true, statusCodes.OK, response));
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Task.findById(id.trim());
    if (!response)
      res
        .status(statusCodes.NOT_FOUND)
        .send(
          require("../payload/payload")(
            false,
            statusCodes.NOT_FOUND,
            null,
            `Not found Task with id=${id}`
          )
        );
    else
      res.send(require("../payload/payload")(true, statusCodes.OK, response));
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Task.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });

    if (!response) {
      res
        .status(statusCodes.NOT_FOUND)
        .send(
          require("../payload/payload")(
            false,
            statusCodes.NOT_FOUND,
            null,
            `Cannot update Task with id=${id}.`
          )
        );
    } else
      res.send(
        require("../payload/payload")(
          true,
          statusCodes.OK,
          response,
          "Task updated successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res) => {};

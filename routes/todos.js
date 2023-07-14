var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();

const todos = [
  {
    id: 1,
    name: "yummy",
    completed: false,
  },
];

//todos

router.get("/", function (req, res, next) {
  res.json(todos);
});
router.get("/:id", function (req, res, next) {
  let foundTodo = todos.find((todo) => todo.id === +req.params.id);
  if (!foundTodo) return next(createHttpError(404, "Not Found"));

  return res.json(foundTodo);
});

router.post("/", function (req, res, next) {
  const { body } = req;
  if (typeof body.name != "string")
    return next(createHttpError(422, "field name should be the string"));
  const isTodoNameExists = todos.find((todo) => todo.name == body.name);
  if (isTodoNameExists) return next(createHttpError(400, "Already exists"));
  const todo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };
  todos.push(todo);
  return res.status(201).json(todo);
});
router.patch("/:id", function (req, res, next) {
  const { body, params } = req;

  const todoIndex = todos.findIndex((todo) => todo.id == params.id);
  if (todoIndex == -1) return next(createHttpError(404, "Not Found"));

  todos[todoIndex].name = body.name;
  return res.json("Updated");
});

router.delete("/:id", function (req, res, next) {
  const { params } = req;
  const todoIndex = todos.findIndex((todo) => todo.id == params.id);
  if (todoIndex == -1) return next(createHttpError(404, "Not Found"));
  todos.splice(todoIndex, 1);
  return res.json("Deleted");
});
module.exports = router;

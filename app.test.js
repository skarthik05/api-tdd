const request = require("supertest");
const app = require("./app");

describe("TODOS  API", () => {
  it("GET /todos => array of todos", () => {
    return request(app)
      .get("/todos")

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),

              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
  it("GET /todos/id => todo by ID", () => {
    return request(app)
      .get("/todos/1")

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),

            completed: expect.any(Boolean),
          })
        );
      });
  });
  it("GET /todos/id =>  404 if item not found", () => {
    return request(app).get("/todos/0").expect(404);
  });

  it("POST /todos => Create new todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "yummy!!",
      })
      .expect(201)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "yummy!!",

            completed: false,
          })
        );
      });
  });
  it("POST /todos => If name is already exists Should throw error", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "yummy",
      })
      .expect(400);
  });
  it("POST /todos => name should except only string, otherwise throw error", () => {
    return request(app)
      .post("/todos")
      .send({
        name: 111,
      })
      .expect(422);
  });
  it("PATCH /todos/id => Update todo", () => {
    return request(app)
      .patch("/todos/1")
      .send({
        name: "Updated",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toBe("Updated");
      });
  });
  it("PATCH /todos/id => throws 404 if not found while updating", () => {
    return request(app)
      .patch("/todos/3")
      .send({
        name: "Updated",
      })
      .expect(404);
  });
  it("DELETE /todos => Delete todo", () => {
    return request(app)
      .delete("/todos/2")

      .expect(200)

      .then((response) => {
        expect(response.body).toBe("Deleted");
      });
  });
  it("DELETE /todos/id => throws 404 if not found while deleting", () => {
    return request(app).delete("/todos/3").expect(404);
  });
});

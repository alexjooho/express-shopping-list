"use strict";

const request = require("supertest");
const app = require("./app");
// let { items } = require("./fakeDb");  don't need this because routes already refer to db

// is it just a syntax thing to do describe...it instead of describe...test

beforeEach(async function () {
    await request(app)
            .post("/items")
            .send({name: "popsicle", price: 1.45})
    await request(app)
            .post("/items")
            .send({name: "cheese", price: 7})
});

afterEach(async function() {
    await request(app)
            .delete("/items/popsicle");
    await request(app)
            .delete("/items/cheese");
});

// afterEach(function() {
//     app.items = [];
// });

describe("GET /items", function () {
    it("Gets the list of items", async function() {
        const resp = await request(app).get("/items");

        let items = [{name: "popsicle", price: 1.45}, {name: "cheese", price: 7}];
        expect(resp.body).toEqual({items})
    });
});

describe("POST /items", function() {
    it("Adds item to list and returns updated:item", async function() {
        const resp = await request(app)
            .post("/items")
            .send({name: "cheesicle", price: 3});
    
        expect(resp.statusCode).toEqual(200);

        const expectedResp = {added: {name: "cheesicle", price: 3}};

        expect(resp.body).toEqual(expectedResp);
    });
});

describe("GET /items/:name", function () {
    it("Gets a specific item", async function() {
        const resp = await request(app).get("/items/cheese");

        let item = {name: "cheese", price: 7};
        expect(resp.body).toEqual(item)
    });
});

describe("PATCH /items/:name", function() {
    it("Updates specific item and returns updated item", async function() {
        const resp = await request(app)
            .patch("/items/popsicle")
            .send({name: "old popsicle", price: 5});
    
        expect(resp.statusCode).toEqual(200);

        const expectedResp = {updated: {name: "old popsicle", price: 5}};

        expect(resp.body).toEqual(expectedResp);
    });
});

describe("DELETE /items/:name", function () {
    it("Delete a specific item", async function() {
        const resp = await request(app).delete("/items/cheese");

        expect(resp.statusCode).toEqual(200);

        const expectedResp = {message: "Deleted cheese"}
        expect(resp.body).toEqual(expectedResp)
    });
});
"use strict";

const express = require("express");
const app = express();

// const { items } = require("./fakedb");

const { NotFoundError, BadRequestError } = require("./expressError");

const itemsRouter = require("./itemsRouter")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


function logger(req, res, next) {
    console.log(`Sending ${req.method} request to ${req.path}.`);
    return next();
  }

app.use(logger);  // maybe try morgan if we have time


app.use("/items", itemsRouter)


app.use(function (req, res) {
    throw new NotFoundError();
  });

app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });  

module.exports = app;
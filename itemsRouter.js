"use strict";

// const items = [];  the "items" in the fakeDb file doesn't update because it isn't same reference

const express = require("express");
const {items} = require("./fakeDb");
const itemsRouter = new express.Router();

itemsRouter.get("/", function(req, res) {
    return res.json({items});
})

itemsRouter.post("/", function(req, res) {
    let newItem = req.body;
    items.push(newItem);
    return res.json({added: newItem});
})

itemsRouter.get("/:name", function(req,res) {
    let itemName = req.params.name;
    let item = items.find(item => item.name === itemName);
    return res.json(item);
})

itemsRouter.patch("/:name", function(req,res) {
    let itemName = req.params.name;
    let itemIndex = items.findIndex(item => item.name === itemName);
    let changedItem = req.body;
    items[itemIndex] = changedItem;
    return res.json({updated: items[itemIndex]});
})

itemsRouter.delete("/:name", function(req,res) {
    let itemName = req.params.name;
    let itemIndex = items.findIndex(item => item.name === itemName);
    items.splice(itemIndex, 1);
    return res.json({message: `Deleted ${itemName}`});
})

module.exports = itemsRouter;
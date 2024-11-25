import express from "express";
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
} from "../controllers/item.controllers.js";

const router = express.Router();

router.route("/").post(createItem).get(getItems);
router.route("/:id").get(getItemById).put(updateItem).delete(deleteItem);

export default router;

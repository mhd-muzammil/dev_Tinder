const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest")
const User=require("../models/user")
const USER_DATA = [
  "firstName",
  "lastName",
  "age",
  "about",
  "photoUrl",
  "skills",
];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "Interested",
        }).populate("fromUserId", USER_DATA);

        res.json({
            message: "Data Fetched Successfully",
            data: connectionRequests
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "Accepted" },
                { fromUserId: loggedInUser._id, status: "Accepted" }
            ],
        }).populate("fromUserId", USER_DATA)
            .populate("toUserId", USER_DATA);
    
        console.log(connectionRequests);
        
        const data = connectionRequests.map((row) => {

            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            
        return row.fromUserId
        });
        res.json({ data});
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ],
        })
            .select("fromUserId toUserId");
            

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ],
        })
            .select(USER_DATA)
            .skip(skip)
            .limit(limit);

        res.send(users);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = userRouter;



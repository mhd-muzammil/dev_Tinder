const express = require("express");
const requestRouter = express.Router();

const User=require("../models/user")
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest=require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["Ignored", "Interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status Type: " + status });
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not Found" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({ 
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectionRequest) {
            return res.status(400).send({message: "Connection request Already Exixt!!"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName+" is "+status+" in "+toUser.firstName, data,
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["Accepted", "Rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "status not valid" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "Interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "connection request not found" });
        }
        connectionRequest.status = status;

        const data = connectionRequest.save();
        res.json({ message: "Connection Request" + status, data });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;
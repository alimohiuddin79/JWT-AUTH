import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

export const getGoal = asyncHandler( async (req, res) => {
    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals);
})

export const setGoal = asyncHandler( async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error("please add a text field");
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    });

    res.status(200).json(goal);
})

export const updateGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error("Goal not found");
    }

    // check user
    if(!req.user){
        res.status(401)
        throw new Error("User not found");
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authroized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedGoal);
})

export const deleteGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error("Goal not found");
    }

    // check user
    if(!req.user){
        res.status(401)
        throw new Error("User not found");
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authroized");
    }

    const deletedGoal = await Goal.deleteOne({_id: req.params.id});

    res.status(200).json({ id: req.user.id });
})
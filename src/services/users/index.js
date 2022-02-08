import express from "express";
import UserModel from './schema.js'
import {userAuth} from '../userAuth/userAuth.js'
import { userOnlyMiddleware } from "../userAuth/user.js";

const userRouter = express.Router()

userRouter.get("/", userAuth, userOnlyMiddleware, async(req, res, next)=> {
    try {
        const user = await UserModel.find()
        res.send(user)
    } catch (error) {
        next(error)
    }
})

// userRouter.get("/me/stories", userAuth, userOnlyMiddleware, async(req, res, next)=> {
//     try {
//         const user = await UserModel.find().populate("blogs")
//         res.send(user)
//     } catch (error) {
//         next(error)
//     }
// })


userRouter.post("/", async(req, res, next)=> {
    try {
        const user = new UserModel(req.body)
        const {_id} = await user.save()
        res.send({_id})
    } catch (error) {
        next(error)
    }
})
userRouter.get("/:userId", userAuth, userOnlyMiddleware, async(req, res, next)=> {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.send(user)
    } catch (error) {
        next(error)
    }
})
userRouter.put("/:userId",  userAuth, userOnlyMiddleware, async(req, res, next)=> {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, {new:true})
        res.send(user)
    } catch (error) {
        next(error)
    }
})
userRouter.delete("/:userId", userAuth, userOnlyMiddleware, async(req, res, next)=> {
    try {
        await UserModel.findByIdAndDelete(req.params.userId)
        res.send()
    } catch (error) {
        next(error)
    }
})

export default userRouter
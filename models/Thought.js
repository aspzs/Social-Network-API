const { timeStamp } = require('console');
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true, 
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timeStamp) => dateFormat(timeStamp),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => dateFormat(timeStamp),
        },

        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.lenght;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
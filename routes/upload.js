const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const { Octokit } = require('@octokit/rest');
const AnimalSchema = require('../db/animalSchema');
require('dotenv').config();

const { ObjectId } = mongoose.Types;

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN,
});

router.post('/upload', async (req, res) => {
	try {
		const animalId = new mongoose.mongo.ObjectId().toString();
		const userId = req.body.path.split('.')[0];
		const content = req.body.base64.split(',')[1];

		await octokit.request('PUT /repos/{owner}/{repo}/contents/images/upload/{path}', {
			owner: 'Utility-Solution-Technology',
			repo: 'hibah-hewan-apps-backend',
			path: `${animalId}_${req.body.path}`,
			message: 'upload image from user',
			committer: {
				name: 'Ibrahimyunel',
				email: 'ibrahim.cbshp@gmail.com',
			},
			content,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		const upload = new AnimalSchema({
			_id: animalId,
			userId,
			path: `${animalId}_${req.body.path}`,
			name: req.body.name,
			type: req.body.type,
			category: req.body.category,
			age: req.body.age,
			weight: req.body.weight,
			time_create: `${req.body.currentDate}_${req.body.currentTime}`,
			description: req.body.caption,
		});

		const result = await upload.save();
		res.status(201).send({
			message: 'Upload successfully',
			result,
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.post('/user-uploads', async (req, res) => {
	try {
		const getUpload = await AnimalSchema.aggregate([
			{
				$match: {
					userId: ObjectId(req.body.userId),
				},
			},
			{
				$sort: {
					_id: -1,
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					pipeline: [{
						$match: {},
					},
					{
						$project: {
							_id: 0,
							whatsapp: 0,
							email: 0,
							password: 0,
						},
					}],
					as: 'userData',
				},
			},
		]);
		res.status(201).send({
			getUpload,
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.post('/latest-uploads', async (req, res) => {
	try {
		const getUpload = await AnimalSchema.aggregate([
			{
				$match: {},
			},
			{
				$limit: 3,
			},
			{
				$sort: {
					_id: -1,
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					pipeline: [{
						$match: {},
					},
					{
						$project: {
							_id: 0,
							whatsapp: 0,
							email: 0,
							password: 0,
						},
					}],
					as: 'userData',
				},
			},
		]);
		res.status(201).send({
			getUpload,
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

module.exports = router;

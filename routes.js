const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");

const { getCollection } = require('./mongoClient');


dotenv.config();

router.get("/", async (req, res) => { 
    return res.send("OK"); 
});

router.get("/on", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    await PowerOutput.updateOne({ name: 'Output A' }, { $set: { state: true } });
    await PowerOutput.updateOne({ name: 'Output B' }, { $set: { state: true } });
    await PowerOutput.updateOne({ name: 'Output C' }, { $set: { state: true } });

    return res.status(200).send(true);
});

router.get("/off", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    await PowerOutput.updateOne({ name: 'Output A' }, { $set: { state: false } });
    await PowerOutput.updateOne({ name: 'Output B' }, { $set: { state: false } });
    await PowerOutput.updateOne({ name: 'Output C' }, { $set: { state: false } });

    return res.status(200).send(false);
});

router.get("/out", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    var output_A = await PowerOutput.findOne({ name: 'Output A' });
    await PowerOutput.updateOne({ name: 'Output A' }, { $set: { state: !output_A.state } });
    await PowerOutput.updateOne({ name: 'Output B' }, { $set: { state: !output_A.state } });
    await PowerOutput.updateOne({ name: 'Output C' }, { $set: { state: !output_A.state } });

    if (!output_A || output_A.state === undefined) return res.status(200).send(false);    

    return res.status(200).send(output_A.state);
});

router.get("/out_a", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    var output_A = await PowerOutput.findOne({ name: 'Output A' });
    await PowerOutput.updateOne({ name: 'Output A' }, { $set: { state: !output_A.state } });

    if (!output_A || output_A.state === undefined) return res.status(200).send(false);    

    return res.status(200).send(output_A.state);
});

router.get("/out_b", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    var output_B = await PowerOutput.findOne({ name: 'Output B' });
    await PowerOutput.updateOne({ name: 'Output B' }, { $set: { state: !output_B.state } });

    if (!output_B || output_B.state === undefined) return res.status(200).send(false);    

    return res.status(200).send(output_B.state);
});

router.get("/out_c", async (req, res) => {
    const PowerOutput = await getCollection('PowerOutput');

    var output_C = await PowerOutput.findOne({ name: 'Output C' });
    await PowerOutput.updateOne({ name: 'Output C' }, { $set: { state: !output_C.state } });

    if (!output_C || !output_C.state) return res.status(200).send(false);    

    return res.status(200).send(output_C.state);
});

router.post("/", async (req, res) => {
    return res.status(200).send('OK');
});

module.exports = router;

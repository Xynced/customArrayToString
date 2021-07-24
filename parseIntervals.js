"use strict";
const { parentPort, workerData } = require("worker_threads");

const format = (start, length) => {
	if (length > 2) return `${start}-${start + length - 1}`
	if (length === 2) return  `${start},${start + length - 1}`
	return start
}

const parseIntervals = (input) => {
	const result = []
	let start = input[0]
	let length = 1
	for (let i = 1; i < input.length; i++) {
		const current = input[i]
		const prev = input[i - 1]
		if (!Number.isInteger(current)) {
			throw `input[${i}] not integer`
		}
		if (current <= prev) {
			throw "input must be sorted and incremental"
		}
		if (current === start + length) {
			length++
		} else {
			result.push(format(start, length))
			start = current
			length = 1
		}
	}
	result.push(format(start, length))
	
	return result.join(",")
}

parentPort.postMessage(
	parseIntervals(workerData)
)
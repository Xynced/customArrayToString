"use strict";
const { Worker } = require('worker_threads')

/**
 * customArrayToString
 * Custom array to string format. Transform all sequencies of numbers with length 2 or more to "n-k"
 *
 * @name customArrayToStrng
 * @function
 * @param {int[]} input The input sorted int list.
 * @returns {String} The output string.
 */
module.exports = async function customArrayToString (input) {
	if (!Array.isArray(input)) {
		throw "input must be array"
	}
	if (!input.length) return ""
	
	return new Promise ((resolve, reject) => {
		const worker = new Worker('./parseIntervals.js', { workerData: input })
		
		worker.on("message", resolve)
		worker.on("error", (e) => reject(e.context))
	})
};


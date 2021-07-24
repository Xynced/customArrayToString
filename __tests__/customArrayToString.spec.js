const customArrayToString = require('../customArrayToString')

describe("custom-array-to-string", () => {
	test("null", async () => {
		expect.assertions(1)
		try {
			await customArrayToString(null)
		} catch (e) {
			expect(e).toBe("input must be array")
		}
	})
	
	test("undefined", async () => {
		expect.assertions(1)
		try {
			await customArrayToString()
		} catch (e) {
			expect(e).toBe("input must be array")
		}
	})
	
	test("not array", async () => {
		expect.assertions(1)
		try {
			await customArrayToString(5)
		} catch (e) {
			expect(e).toBe("input must be array")
		}
	})
	
	test("contains null", async () => {
		expect.assertions(1)
		try {
			await customArrayToString([1, null, 2])
		} catch (e) {
			expect(e).toBe("input[1] not integer")
		}
	})
	
	test("contains string", async () => {
		expect.assertions(1)
		try {
			await customArrayToString([1, "2", 2])
		} catch (e) {
			expect(e).toBe("input[1] not integer")
		}
	})
	
	test("contains duplicats", async () => {
		expect.assertions(1)
		try {
			await customArrayToString([1, 2, 2])
		} catch (e) {
			expect(e).toBe("input must be sorted and incremental")
		}
	})
	
	test("not sorted", async () => {
		expect.assertions(1)
		try {
			await customArrayToString([1, 3, 2])
		} catch (e) {
			expect(e).toBe("input must be sorted and incremental")
		}
	})
	
	test("empty array", async () => {
		expect.assertions(1)
		await expect(customArrayToString([])).resolves.toBe("")
	})
	
	test("one element", async () => {
		expect.assertions(1)
		await expect(customArrayToString([1])).resolves.toBe("1")
	})
	
	test("two elements sequence", async () => {
		expect.assertions(1)
		await expect(customArrayToString([1, 2])).resolves.toBe("1,2")
	})
	
	test("two elements not sequence", async () => {
		expect.assertions(1)
		await expect(customArrayToString([1, 3])).resolves.toBe("1,3")
	})
	
	test("three elements sequence", async () => {
		expect.assertions(1)
		await expect(customArrayToString([1, 2, 3])).resolves.toBe("1-3")
	})
	
	test("three elements not sequence", async () => {
		expect.assertions(1)
		await expect(customArrayToString([1, 3, 5])).resolves.toBe("1,3,5")
	})
	
	test("very long sequence", async () => {
		expect.assertions(1)
		const arr = Array.from({length: 10e6}, (_, i) => i + 1)
		const result = await customArrayToString(arr)
		await expect(result).toBe("1-10000000")
	}, 30000)
	
	test("very long not sequence", async () => {
		expect.assertions(1)
		const arr = Array.from({length: 10e6}, (_, i) => i * 2 + 1)
		const result = await customArrayToString(arr)
		await expect(result).toBe(arr.join(","))
	}, 30000)
})
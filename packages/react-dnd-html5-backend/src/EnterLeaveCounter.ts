const union = require('lodash/union')
const without = require('lodash/without')

export default class EnterLeaveCounter {
	private entered: any[] = []

	public enter(enteringNode: any) {
		const previousLength = this.entered.length

		const isNodeEntered = (node: any) =>
			document.documentElement.contains(node) &&
			(!node.contains || node.contains(enteringNode))

		this.entered = union(this.entered.filter(isNodeEntered), [enteringNode])

		return previousLength === 0 && this.entered.length > 0
	}

	public leave(leavingNode: any) {
		const previousLength = this.entered.length

		this.entered = without(
			this.entered.filter(node => document.documentElement.contains(node)),
			leavingNode,
		)

		return previousLength > 0 && this.entered.length === 0
	}

	public reset() {
		this.entered = []
	}
}

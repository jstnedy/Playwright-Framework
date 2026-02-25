class AttendanceCorrectionService {
    constructor(seedRecords = {}) {
        this.records = { ...seedRecords };
        this.requests = [];
        this.nextId = 1;
    }

    getAttendance(employeeId) {
        return this.records[employeeId] ?? null;
    }

    submitCorrection({ actorRole, employeeId, proposedAttendance, reason = '' }) {
        if (actorRole !== 'supervisor') {
            throw new Error('Only supervisors can submit attendance corrections.');
        }

        const request = {
            id: this.nextId++,
            employeeId,
            oldAttendance: this.getAttendance(employeeId),
            proposedAttendance,
            reason,
            status: 'Pending',
            requestedByRole: actorRole,
            reviewedByRole: null
        };

        this.requests.push(request);
        return request;
    }

    approveCorrection({ actorRole, requestId }) {
        if (actorRole !== 'admin') {
            throw new Error('Only admins can approve attendance corrections.');
        }

        const request = this._getRequestOrThrow(requestId);
        if (request.status !== 'Pending') {
            throw new Error(`Request ${requestId} is already ${request.status}.`);
        }

        request.status = 'Approved';
        request.reviewedByRole = actorRole;
        this.records[request.employeeId] = request.proposedAttendance;

        return request;
    }

    rejectCorrection({ actorRole, requestId }) {
        if (actorRole !== 'admin') {
            throw new Error('Only admins can reject attendance corrections.');
        }

        const request = this._getRequestOrThrow(requestId);
        if (request.status !== 'Pending') {
            throw new Error(`Request ${requestId} is already ${request.status}.`);
        }

        request.status = 'Rejected';
        request.reviewedByRole = actorRole;
        return request;
    }

    _getRequestOrThrow(requestId) {
        const request = this.requests.find((r) => r.id === requestId);
        if (!request) {
            throw new Error(`Request ${requestId} was not found.`);
        }
        return request;
    }
}

module.exports = { AttendanceCorrectionService };

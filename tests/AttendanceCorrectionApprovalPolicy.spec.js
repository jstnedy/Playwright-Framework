const { test, expect } = require('@playwright/test');
const { AttendanceCorrectionService } = require('../utils/AttendanceCorrectionService');

test.describe('Attendance Correction Approval Policy', () => {
    test('supervisor submission stays pending until admin approval', async () => {
        const service = new AttendanceCorrectionService({ E001: 'Absent' });

        const request = service.submitCorrection({
            actorRole: 'supervisor',
            employeeId: 'E001',
            proposedAttendance: 'Present',
            reason: 'Late biometric sync'
        });

        expect(request.status).toBe('Pending');
        expect(service.getAttendance('E001')).toBe('Absent');
    });

    test('only admin can approve and apply attendance change', async () => {
        const service = new AttendanceCorrectionService({ E002: 'Absent' });

        const request = service.submitCorrection({
            actorRole: 'supervisor',
            employeeId: 'E002',
            proposedAttendance: 'Present'
        });

        expect(() =>
            service.approveCorrection({ actorRole: 'supervisor', requestId: request.id })
        ).toThrow('Only admins can approve attendance corrections.');

        const approved = service.approveCorrection({
            actorRole: 'admin',
            requestId: request.id
        });

        expect(approved.status).toBe('Approved');
        expect(service.getAttendance('E002')).toBe('Present');
    });

    test('non-supervisor cannot submit correction', async () => {
        const service = new AttendanceCorrectionService({ E003: 'Present' });

        expect(() =>
            service.submitCorrection({
                actorRole: 'employee',
                employeeId: 'E003',
                proposedAttendance: 'Absent'
            })
        ).toThrow('Only supervisors can submit attendance corrections.');
    });

    test('rejected request does not change attendance', async () => {
        const service = new AttendanceCorrectionService({ E004: 'Absent' });

        const request = service.submitCorrection({
            actorRole: 'supervisor',
            employeeId: 'E004',
            proposedAttendance: 'Present'
        });

        const rejected = service.rejectCorrection({
            actorRole: 'admin',
            requestId: request.id
        });

        expect(rejected.status).toBe('Rejected');
        expect(service.getAttendance('E004')).toBe('Absent');
    });
});

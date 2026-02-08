import {
    generateCryptoSignature,
    validateSignatureFormat
} from '../crypto-signature';


describe('Signature Generator', () => {
    const TEST_PARAMS = {
        userId: 'ethno-expert-789',
        recordId: 'BTSA-MED-2024-001',
        actionType: 'approve',
        stage: 2,
        timestamp: '2024-01-15T14:30:00.000Z'
    };

    // TEST 1: Basic signature format
    it('generates signature with correct format', () => {
        const sig = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp
        );

        expect(sig.startsWith('SIG_ETHNO_')).toBe(true);

        // Must contain stage number
        expect(sig.includes(`_${TEST_PARAMS.stage}_`)).toBe(true);

        // Must end with 8 hex characters
        const hashPart = sig.split('_').pop();
        expect(hashPart).toMatch(/^[a-f0-9]{8}$/);

        // Full format validation
        expect(validateSignatureFormat(sig, TEST_PARAMS.stage)).toBe(true);
    })

    // TEST 2: Deterministic output (critical for audit trails)
    it('same inputs produce identical signatures', () => {
        const sig1 = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'fixed-nonce-123' // Fixed nonce for determinism test
        );

        const sig2 = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'fixed-nonce-123'
        );

        expect(sig1).toBe(sig2);
    });

    // TEST 3: Tamper detection (core security feature)
    it('different parameters produce different signatures', () => {
        const original = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'test-nonce'
        );

        // Change user ID
        const differentUser = generateCryptoSignature(
            'different-user',
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'test-nonce'
        );

        // Change stage
        const differentStage = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            3, // Different stage
            TEST_PARAMS.timestamp,
            'test-nonce'
        );

        // Change timestamp
        const differentTime = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            '2024-01-16T00:00:00.000Z',
            'test-nonce'
        );

        expect(original).not.toBe(differentUser);
        expect(original).not.toBe(differentStage);
        expect(original).not.toBe(differentTime);
    });

    // TEST 4: Stage validation
    it('validates signature format against expected stage', () => {
        const stage2Sig = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            'approve',
            2,
            TEST_PARAMS.timestamp
        );

        const stage3Sig = generateCryptoSignature(
            TEST_PARAMS.userId,
            TEST_PARAMS.recordId,
            'publish',
            3,
            TEST_PARAMS.timestamp
        );

        // Correct stage validation
        expect(validateSignatureFormat(stage2Sig, 2)).toBe(true);
        expect(validateSignatureFormat(stage3Sig, 3)).toBe(true);

        // Incorrect stage validation
        expect(validateSignatureFormat(stage2Sig, 3)).toBe(false);
        expect(validateSignatureFormat(stage3Sig, 1)).toBe(false);

        // Invalid signature formats
        expect(validateSignatureFormat('INVALID_SIG', 2)).toBe(false);
        expect(validateSignatureFormat('SIG_ETHNO_4_abc12345', 2)).toBe(false);
        expect(validateSignatureFormat('SIG_ETHNO_2_abc1234', 2)).toBe(false);
    });

    // TEST 5: Normalization handling (security critical)
    test('normalizes inputs consistently', () => {
        // Test case insensitivity for user ID
        const sig1 = generateCryptoSignature(
            'ETHNO-EXPERT-789', // Uppercase
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'nonce'
        );

        const sig2 = generateCryptoSignature(
            'ethno-expert-789', // Lowercase
            TEST_PARAMS.recordId,
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'nonce'
        );

        // Should produce identical signatures after normalization
        expect(sig1).toBe(sig2);

        // Test record ID case normalization
        const sig3 = generateCryptoSignature(
            TEST_PARAMS.userId,
            'btsa-med-2024-001', // Lowercase
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'nonce'
        );

        const sig4 = generateCryptoSignature(
            TEST_PARAMS.userId,
            'BTSA-MED-2024-001', // Uppercase
            TEST_PARAMS.actionType,
            TEST_PARAMS.stage,
            TEST_PARAMS.timestamp,
            'nonce'
        );

        expect(sig3).toBe(sig4);
    });

    // TEST 6: Error handling
    it('throws error on invalid stage in validation', () => {

        // Stage must be 1, 2, 3
        expect(() => {
            generateCryptoSignature(
                'ETHNO-EXPERT-200',
                TEST_PARAMS.recordId,
                TEST_PARAMS.actionType,
                4,
                TEST_PARAMS.timestamp,
                'nonce'
            )
        }).toThrow();
    });

    it('handles invalid stages and formats', () => {

        expect(() => validateSignatureFormat('SIG_ETHNO_4_abc12345', 4)).toThrow();

        expect(validateSignatureFormat('INVALID_FORMAT', 1)).toBe(false);
    });

})

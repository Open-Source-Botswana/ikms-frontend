/**
 * SIGNATURE GENERATOR
 * =====================
 *
 *
 * In production system:
 * - Blockchain signatures MUST be generated CLIENT-SIDE using user's wallet (MetaMask, etc.)
 * - OR via secure hardware module (HSM) with strict access controls
 *
 *
 *
 * Purpose in this system:
 * - Create deterministic, tamper-evident event identifiers
 * - Simulate blockchain anchoring for audit trails
 * - Enable testing of signature validation workflows
 * - Provide visual feedback in UI ("SIG_..." format)
 * - It serves as a unique event fingerprint for demonstration.
 *
 * TODO: Note: provide cryptographically signed metadata.
 *
 */

import crypto from 'crypto';

/**
 * Generates a simulated blockchain signature for verification events
 *
 * @param userId - ID of the user performing verification (e.g., "ethno-expert-789")
 * @param recordId - Ethnobotanical record ID (e.g., "BTSA-MED-2024-001")
 * @param actionType - Verification action ("approve", "deny", etc.)
 * @param stage - Current verification stage (1, 2, or 3)
 * @param timestamp - ISO 8601 timestamp (MUST match event timestamp for integrity)
 * @param nonce - Optional random string to prevent replay attacks (simulated)
 *
 * @returns Simulated signature string in format:
 *          "SIG_ETHNO_{stage}_{first8CharsOfHash}"
 *          Example: "SIG_ETHNO_2_a3f9c1d8"
 *
 * @workflow
 * 1. Combines critical event parameters into canonical string
 * 2. Adds security nonce to prevent replay attacks
 * 3. Generates SHA-256 hash (simulating cryptographic signature)
 * 4. Formats with stage identifier for quick validation
 * 5. Returns human-readable signature string
 */
export function generateCryptoSignature(
    userId: string,
    recordId: string,
    actionType: string,
    stage: number,
    timestamp: string,
    nonce: string = crypto.randomBytes(8).toString('hex')
): string {
    // SECTION 1: CREATE CANONICAL EVENT STRING
    // Why: Ensures identical inputs ALWAYS produce identical signatures
    // Prevents tampering - any change to parameters alters the signature
    // Normalize the inputs
    const eventPayload = [
        userId.trim().toLowerCase(),
        recordId.trim().toUpperCase(),
        actionType.trim().toLowerCase(),
        stage.toString(),
        timestamp.trim(),
        nonce
    ].join('|'); // Delimiter prevents parameter collision

    // SECTION 2: GENERATE CRYPTOGRAPHIC HASH
    // Why: Creates unique fingerprint of the event
    // SHA-256 is industry standard (used in Bitcoin/Ethereum)
    // Note: In REAL implementation, this would be SIGNED with private key
    const hash = crypto
        .createHash('sha256')
        .update(eventPayload)
        .digest('hex');

    // SECTION 3: FORMAT SIGNATURE FOR STORAGE/DISPLAY
    // Why: Human-readable format with embedded metadata
    // Format: SIG_{DOMAIN}_{STAGE}_{HASH_PREFIX}
    // - "ETHNO" identifies ethnobotanical domain
    // - Stage number enables quick validation
    // - 8-char hash prefix is sufficient for UI display
    // Full hash stored in database for integrity checks
    const signature = `SIG_ETHNO_${stage}_${hash.substring(0, 8)}`;

    // SECTION 4: SECURITY VALIDATION (Self-check)
    // Why: Catch implementation errors immediately
    // Ensures signature meets expected format before returning
    if (!/^SIG_ETHNO_[1-3]_[a-f0-9]{8}$/.test(signature)) {
        throw new Error(`Invalid signature format generated: ${signature}`);
    }

    return signature;
}

/**
 * VALIDATES a simulated blockchain signature
 *
 * @param signature - Signature string to validate
 * @param expectedStage - Expected verification stage (1, 2, or 3)
 * @returns true if signature format is valid for the stage
 *
 * Use Case:
 * - Verify signature wasn't corrupted in storage
 * - Confirm signature belongs to expected verification stage
 * - Quick client-side validation before API calls
 */
export function validateSignatureFormat(
    signature: string,
    expectedStage: number
): boolean {


    // Regex explanation:
    // ^SIG_ETHNO_       : Must start with domain prefix
    // [1-3]_            : Stage must be 1, 2, or 3
    // [a-f0-9]{8}$      : Exactly 8 hex characters at end
    if (expectedStage < 1 || expectedStage > 3) {
        throw new Error(`Invalid stage: ${expectedStage}. Stage must be 1, 2, or 3.`);
    }

    const pattern = new RegExp(`^SIG_ETHNO_${expectedStage}_[a-f0-9]{8}$`);
    return pattern.test(signature);
}

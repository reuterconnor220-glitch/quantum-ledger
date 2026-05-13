/**
 * PQC migration tracker — who has actually shipped, who has committed, who is silent.
 *
 * Status taxonomy:
 *   - shipped:    PQC live in production traffic / signed code
 *   - hybrid:     PQC running alongside classical (hybrid handshake)
 *   - announced:  Public commitment with a date
 *   - committed:  Public commitment without a specific date
 *   - silent:     No public position despite obvious exposure
 */

export type PqcStatus = 'shipped' | 'hybrid' | 'announced' | 'committed' | 'silent';

export type PqcDomain =
  | 'consumer_messaging'
  | 'consumer_browser'
  | 'cloud_tls'
  | 'cdn_edge'
  | 'operating_system'
  | 'cryptography_library'
  | 'banking'
  | 'government'
  | 'iot_firmware'
  | 'vpn'
  | 'database'
  | 'enterprise_saas';

export interface PqcDeployment {
  org: string;
  product: string;
  domain: PqcDomain;
  status: PqcStatus;
  algorithm: string;
  date?: string;
  details: string;
  source?: string;
}

export const PQC_DEPLOYMENTS: PqcDeployment[] = [
  // ===== Consumer messaging =====
  {
    org: 'Apple',
    product: 'iMessage (PQ3 protocol)',
    domain: 'consumer_messaging',
    status: 'shipped',
    algorithm: 'ML-KEM (Kyber) + ECDH hybrid · ratcheted',
    date: '2024-02-21',
    details: 'PQ3 launched in iOS 17.4. Post-quantum key establishment with continuous re-keying. Largest deployment of PQC to consumers globally — billions of iMessage handshakes daily.',
    source: 'https://security.apple.com/blog/imessage-pq3/',
  },
  {
    org: 'Signal',
    product: 'Signal Protocol PQXDH',
    domain: 'consumer_messaging',
    status: 'shipped',
    algorithm: 'PQXDH (ML-KEM + X25519 hybrid)',
    date: '2023-09-19',
    details: 'First PQC-enabled key agreement in Signal — X25519 plus Kyber (now ML-KEM). All Signal handshakes now post-quantum.',
    source: 'https://signal.org/blog/pqxdh/',
  },

  // ===== Browsers + CDN / TLS =====
  {
    org: 'Cloudflare',
    product: 'TLS 1.3 PQ key agreement',
    domain: 'cdn_edge',
    status: 'shipped',
    algorithm: 'X25519MLKEM768 (ML-KEM + X25519 hybrid)',
    date: '2024-09-10',
    details: 'PQC key agreement live across the Cloudflare edge. As of late 2025, ~52% of inbound TLS traffic to Cloudflare uses a post-quantum hybrid handshake — the highest organic PQC adoption rate on the public web.',
    source: 'https://blog.cloudflare.com/post-quantum-to-origins/',
  },
  {
    org: 'Google',
    product: 'Chrome (TLS 1.3 + Boring SSL)',
    domain: 'consumer_browser',
    status: 'shipped',
    algorithm: 'X25519MLKEM768 (hybrid)',
    date: '2024-05-15',
    details: 'Chrome enabled ML-KEM hybrid TLS by default in Chrome 124. Together with Cloudflare deployment, established the de-facto industry default.',
    source: 'https://blog.chromium.org/2024/05/advancing-our-amazing-bet-on-asymmetric.html',
  },
  {
    org: 'Mozilla',
    product: 'Firefox',
    domain: 'consumer_browser',
    status: 'shipped',
    algorithm: 'X25519MLKEM768',
    date: '2025-04-01',
    details: 'Firefox 132 enabled ML-KEM hybrid TLS by default. Brings open-source browser to parity with Chrome on PQC handshakes.',
  },
  {
    org: 'Akamai',
    product: 'Edge platform TLS',
    domain: 'cdn_edge',
    status: 'shipped',
    algorithm: 'X25519MLKEM768',
    date: '2025-Q1',
    details: 'PQC hybrid key agreement available on Akamai edge for customer configuration; default-on for traffic to PQC-capable origins.',
  },
  {
    org: 'Fastly',
    product: 'Edge TLS',
    domain: 'cdn_edge',
    status: 'hybrid',
    algorithm: 'X25519MLKEM768',
    date: '2025-Q2',
    details: 'PQC TLS available as an opt-in for customers; not default-on across the platform.',
  },

  // ===== Cloud / hyperscaler =====
  {
    org: 'AWS',
    product: 'KMS, Secrets Manager, ACM',
    domain: 'cloud_tls',
    status: 'shipped',
    algorithm: 'ML-KEM + classical hybrid',
    date: '2024-08-13',
    details: 'AWS KMS and several internal services migrated to post-quantum hybrid TLS. AWS published a multi-year migration plan covering S3, CloudFront, ACM.',
    source: 'https://aws.amazon.com/security/post-quantum-cryptography/',
  },
  {
    org: 'Microsoft Azure',
    product: 'Azure Confidential Computing + Key Vault',
    domain: 'cloud_tls',
    status: 'hybrid',
    algorithm: 'ML-KEM, ML-DSA',
    date: '2025-Q1',
    details: 'Azure Key Vault offers PQC algorithms in preview. SymCrypt library updated to support ML-KEM and ML-DSA. Production rollout staged through 2026.',
    source: 'https://learn.microsoft.com/en-us/azure/key-vault/keys/quantum-safe-cryptography',
  },
  {
    org: 'Google Cloud',
    product: 'Cloud KMS + ALTS',
    domain: 'cloud_tls',
    status: 'hybrid',
    algorithm: 'ML-KEM hybrid',
    date: '2024-12-01',
    details: 'Cloud KMS supports ML-DSA signing in preview. Internal ALTS service-to-service authentication uses hybrid key agreement.',
  },

  // ===== OS / device firmware =====
  {
    org: 'Apple',
    product: 'iOS / macOS Sequoia secure enclave',
    domain: 'operating_system',
    status: 'shipped',
    algorithm: 'ML-DSA for code signing (transitional)',
    date: '2025-Q3',
    details: 'Apple signaling movement on PQC for Secure Enclave attestation and code signing chains. Full timeline not public.',
  },
  {
    org: 'Microsoft Windows',
    product: 'Windows 11 + SymCrypt',
    domain: 'operating_system',
    status: 'hybrid',
    algorithm: 'ML-KEM, ML-DSA, SLH-DSA',
    date: '2025-Q2',
    details: 'Windows 11 24H2 introduced PQC algorithm support in SymCrypt. Developer APIs available; default in TLS not yet enabled.',
    source: 'https://techcommunity.microsoft.com/blog/windows-itpro-blog/post-quantum-cryptography-comes-to-windows-insiders/4413803',
  },

  // ===== Crypto libraries =====
  {
    org: 'OpenSSL',
    product: 'OpenSSL 3.5 + oqs-provider',
    domain: 'cryptography_library',
    status: 'shipped',
    algorithm: 'ML-KEM, ML-DSA, SLH-DSA',
    date: '2025-04-08',
    details: 'OpenSSL 3.5 ships with ML-KEM, ML-DSA, and SLH-DSA in the default build. Foundational for downstream PQC deployment across server software.',
  },
  {
    org: 'BoringSSL (Google)',
    product: 'BoringSSL',
    domain: 'cryptography_library',
    status: 'shipped',
    algorithm: 'ML-KEM',
    date: '2024-05',
    details: 'ML-KEM support in BoringSSL underpins Chrome and Google service deployment.',
  },
  {
    org: 'liboqs (Open Quantum Safe)',
    product: 'liboqs + oqs-provider',
    domain: 'cryptography_library',
    status: 'shipped',
    algorithm: 'All NIST PQC + alternates',
    date: 'Ongoing',
    details: 'Reference implementations of every NIST-standardized and candidate algorithm. The de facto research baseline for PQC integration testing.',
  },

  // ===== Banking / finance =====
  {
    org: 'JPMorgan Chase',
    product: 'Internal crypto modernization',
    domain: 'banking',
    status: 'committed',
    algorithm: 'NIST PQC suite',
    date: '2025-09',
    details: 'JPMorgan publicly committed to post-quantum migration across internal systems; timeline disclosed as multi-year with no public completion date.',
  },
  {
    org: 'HSBC',
    product: 'Trade finance PQC pilot',
    domain: 'banking',
    status: 'shipped',
    algorithm: 'ML-KEM hybrid',
    date: '2025-03',
    details: 'HSBC ran the first publicly disclosed live PQ-secured trade-finance transaction between Hong Kong and London. Pilot, not production.',
  },
  {
    org: 'BNY Mellon',
    product: 'Internal PQC roadmap',
    domain: 'banking',
    status: 'committed',
    algorithm: 'NIST PQC',
    date: '2024-Q4',
    details: 'Public commitment to PQC migration as part of broader cryptographic modernization.',
  },

  // ===== Government =====
  {
    org: 'U.S. NSA',
    product: 'CNSA 2.0 mandate',
    domain: 'government',
    status: 'announced',
    algorithm: 'ML-KEM-1024, ML-DSA-87, SHA-384, AES-256',
    date: 'Effective 2027 onward',
    details: 'CNSA 2.0 mandates PQC for U.S. National Security Systems. Software signing PQC-only by 2027; networking PQC-only by 2030; HSMs PQC-only by 2030.',
    source: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF',
  },
  {
    org: 'NIST',
    product: 'FIPS 203 / 204 / 205',
    domain: 'government',
    status: 'shipped',
    algorithm: 'ML-KEM, ML-DSA, SLH-DSA',
    date: '2024-08-13',
    details: 'NIST formally standardized ML-KEM (Kyber), ML-DSA (Dilithium), and SLH-DSA (SPHINCS+). The reference for every other PQC migration.',
    source: 'https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards',
  },
  {
    org: 'UK NCSC',
    product: 'PQC guidance + Government Crypto Modernisation',
    domain: 'government',
    status: 'announced',
    algorithm: 'NIST PQC suite',
    date: 'Multi-year through 2035',
    details: 'NCSC published PQC migration roadmap targeting all UK government systems by 2035. Aligned with NIST standards.',
  },
  {
    org: 'EU ENISA',
    product: 'Post-Quantum Cryptography Coordinated Implementation Roadmap',
    domain: 'government',
    status: 'announced',
    algorithm: 'NIST PQC suite',
    date: '2025',
    details: 'ENISA published a coordinated PQC implementation roadmap for EU member states. Aligned with EuroQCI quantum-network deployment.',
  },

  // ===== Database / messaging infra =====
  {
    org: 'WireGuard',
    product: 'Reference VPN protocol',
    domain: 'vpn',
    status: 'committed',
    algorithm: 'TBD (PQC hybrid)',
    date: '2026 roadmap',
    details: 'WireGuard maintainers have signaled PQC integration is on the roadmap but not shipped at protocol level. Forks (e.g., Mullvad) experiment with PQC layers.',
  },
  {
    org: 'OpenVPN',
    product: 'OpenVPN 3 CloudConnexa',
    domain: 'vpn',
    status: 'hybrid',
    algorithm: 'ML-KEM hybrid via TLS layer',
    date: '2025-Q2',
    details: 'OpenVPN CloudConnexa enables PQC via underlying TLS stack when OpenSSL 3.5 or equivalent is used.',
  },

  // ===== Notable absences =====
  {
    org: 'Meta (Facebook / Instagram / WhatsApp)',
    product: 'Consumer messaging + auth',
    domain: 'consumer_messaging',
    status: 'silent',
    algorithm: '—',
    details: 'No public PQC roadmap as of May 2026 despite billions of daily handshakes. WhatsApp is widely expected to follow Signal\'s PQXDH design since Signal Protocol underpins WhatsApp encryption.',
  },
  {
    org: 'X (Twitter)',
    product: 'TLS, DMs',
    domain: 'consumer_messaging',
    status: 'silent',
    algorithm: '—',
    details: 'No public PQC commitment.',
  },
];

export const PQC_DOMAIN_LABEL: Record<PqcDomain, string> = {
  consumer_messaging: 'Consumer messaging',
  consumer_browser: 'Browsers',
  cloud_tls: 'Cloud / TLS',
  cdn_edge: 'CDN / edge',
  operating_system: 'Operating systems',
  cryptography_library: 'Crypto libraries',
  banking: 'Banking / finance',
  government: 'Government',
  iot_firmware: 'IoT / firmware',
  vpn: 'VPN',
  database: 'Database',
  enterprise_saas: 'Enterprise SaaS',
};

export const PQC_STATUS_LABEL: Record<PqcStatus, string> = {
  shipped: 'Shipped',
  hybrid: 'Hybrid live',
  announced: 'Announced',
  committed: 'Committed',
  silent: 'Silent',
};

export const PQC_STATUS_COLOR: Record<PqcStatus, string> = {
  shipped: 'bg-accent-data/15 text-accent-data',
  hybrid: 'bg-accent-quantum/15 text-accent-quantum',
  announced: 'bg-accent-warn/15 text-accent-warn',
  committed: 'bg-blue-500/15 text-blue-300',
  silent: 'bg-accent-down/15 text-accent-down',
};
